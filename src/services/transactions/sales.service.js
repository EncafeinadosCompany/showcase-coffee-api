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

        const providerId = await this.shoppingVariantRepository.getProviderByShoppingVariant(
          detail.id_variant_products,
          { transaction }
        );

        if (typeof providerId === 'number' && !isNaN(providerId)) {
          providerIds.add(providerId);
        }
      }

      const newSale = await this.saleRepository.updateTotal(sale.id, { total }, { transaction });

      await transaction.commit();

      for (const providerId of providerIds) {
        try {
          await this.liquidationService.calculateProviderDebt(providerId);
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
    if (!detail.id_variant_products || !detail.quantity || !detail.id_shopping_variant) {
      throw new Error('Invalid sales detail data: missing product or shopping variant information');
    }

    const productVariant = await this.variantRepository.findByIdVariant(detail.id_variant_products, { transaction });

    if (!productVariant) throw new Error('Variant product not found');
    if (productVariant.stock < detail.quantity) {
      throw new Error(`Insufficient stock for variant ID ${detail.id_variant_products}`);
    }

    const newSaleDetail = await this.salesVariantRepository.create(
      {
        id_sale: saleId,
        id_shopping_variant: detail.id_shopping_variant,
        id_variant_products: detail.id_variant_products,
        quantity: detail.quantity,
        subtotal: detail.sale_price * detail.quantity
      },
      { transaction }
    );

    await this.variantRepository.updateStock(
      productVariant.id,
      productVariant.stock - detail.quantity,
      { transaction }
    );

    return newSaleDetail;
  };

}

module.exports = SaleService;