class SaleService {

  constructor(SalesRepository, VariantRepository, ShoppingVariantRepository, SalesVariantRepository, LiquidationService, sequelize) {
    this.saleRepository = SalesRepository;
    this.variantRepository = VariantRepository;
    this.shoppingVariantRepository = ShoppingVariantRepository;
    this.salesVariantRepository = SalesVariantRepository;
    this.liquidationService = LiquidationService;
    this.sequelize = sequelize;
  }

  async getAllSales() {
    return await this.saleRepository.getAll();
  };

  async getSalesById(id) {
    return await this.saleRepository.getById(id);
  };

  async createSale(data) {
    const transaction = await this.sequelize.transaction();
    try {
      if (!data.sale || !data.details?.length) {
        throw new Error('Invalid sales data: missing sale or details information');
      }

      let total = 0;
      const sale = await this.saleRepository.create(data.sale, { transaction });
      const providerIds = new Set();

      for (const detail of data.details) {
        const saleDetail = await this.createSaleDetail(sale.id, detail, transaction);
        total += Number(saleDetail.subtotal);

        saleDetail.providerSales.forEach((value, providerId) => {
          providerIds.add(providerId);
        });
      }

      const newSale = await this.saleRepository.updateTotal(sale.id, { total }, { transaction });

      await transaction.commit();

      for (const providerId of providerIds) {
        try {
         
          await this.liquidationService.calculateProviderDebt(providerId, newSale.created_at);
        } catch (err) {
          console.error(`❌ Error actualizando deuda para el proveedor ${providerId}:`, err);
        }
      }

      return newSale;
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Sale creation failed: ${error.message}`);
    }
  };

  async createSaleDetail(saleId, detail, transaction) {
    if (!detail.id_variant_products || !detail.quantity) {
      throw new Error('Invalid sales detail data: missing product information');
    }

    const productVariant = await this.variantRepository.findByIdVariant(
      detail.id_variant_products,
      { transaction }
    );

    if (!productVariant) throw new Error('Variant product not found');
    if (productVariant.stock < detail.quantity) {
      throw new Error(`Insufficient stock for variant ID ${detail.id_variant_products}`);
    }

    const availableStocks = await this.shoppingVariantRepository.getAvailableStock(
      detail.id_variant_products,
      transaction
    );

    let remainingQuantity = detail.quantity;
    let totalSubtotal = 0;
    const providerSales = new Map();

    for (const stock of availableStocks) {
      if (remainingQuantity <= 0) break;

      const quantityToDeduct = Math.min(stock.remaining_quantity, remainingQuantity);
      const providerId = stock.shopping.employee.id_provider;

      const newSaleDetail = await this.salesVariantRepository.create({
        id_sale: saleId,
        id_shopping_variant: stock.id,
        id_variant_products: detail.id_variant_products,
        quantity: quantityToDeduct,
        subtotal: detail.sale_price * quantityToDeduct
      }, { transaction });

      if (!providerSales.has(providerId)) {
        providerSales.set(providerId, 0);
      }
      providerSales.set(
        providerId,
        providerSales.get(providerId) + (quantityToDeduct * stock.shopping_price)
      );

      totalSubtotal += newSaleDetail.subtotal;

      await this.shoppingVariantRepository.updateRemainingQuantity(
        stock.id,
        stock.remaining_quantity - quantityToDeduct,
        transaction
      );

      remainingQuantity -= quantityToDeduct;
    }

    await this.variantRepository.updateStock(
      productVariant.id,
      productVariant.stock - detail.quantity,
      { transaction }
    );

    if (remainingQuantity > 0) {
      throw new Error(`Stock insuficiente para la variante ${detail.id_variant_products}`);
    }

    return {
      subtotal: totalSubtotal,
      providerSales
    };
  }; 

 


}

module.exports = SaleService;