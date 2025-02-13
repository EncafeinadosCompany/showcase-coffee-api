class SaleService {

  constructor(SalesRepository, VariantRepository, ShoppingVariantRepository, SalesVariantRepository, LiquidationService, sequelize) {
    this.saleRepository = SalesRepository;
    this.variantRepository = VariantRepository;
    this.shoppingRepository = ShoppingVariantRepository;
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

      const sale = await this.saleRepository.create(data.sale, { transaction });
      const { total, providerIds } = await this._processSaleDetails(sale.id, data.details, transaction);
      const newSale = await this.saleRepository.updateTotal(sale.id, { total }, { transaction });

      await transaction.commit();

      console.log('provvedores', providerIds);
      if (providerIds.size) {
        Promise.allSettled(
          Array.from(providerIds).map(id =>
            this.liquidationService.updateLiquidationCalculation(id)
              .catch(err => console.error(`Liquidation update failed for provider ${id}:`, err))
          )
        );
      }

      return newSale;
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Sale creation failed: ${error.message}`);
    }
  }

  async _processSaleDetails(saleId, details, transaction) {
    let total = 0;
    const providerIds = new Set();

    for (const detail of details) {
        const saleDetail = await this.createSaleDetail(saleId, detail, transaction);
        total += Number(saleDetail.subtotal);

        const providerId = await this.shoppingRepository.findShoppingByVariant(
            detail.id_variant_products,
            { transaction }
        );

        console.log(`🟡 Buscando providerId para variant ${detail.id_variant_products}:`, providerId);

        if (typeof providerId === 'number' && !isNaN(providerId)) {
            providerIds.add(providerId);
        } else {
            console.error(`❌ Error: providerId no es un número válido`, providerId);
        }
    }

    return { total, providerIds };
}


  async createSaleDetail(saleId, detail, transaction) {
    if (!detail.id_variant_products || !detail.quantity) {
      throw new Error('Invalid sales detail data: missing product information');
    }

    const [productVariant, existingDetail] = await Promise.all([
      this.variantRepository.findByIdVariant(detail.id_variant_products, { transaction }),
      this.salesVariantRepository.findByShoppingAndProduct(
        saleId,
        detail.id_variant_products,
        { transaction }
      )
    ]);

    if (!productVariant) throw new Error('Variant product not found');
    if (productVariant.stock < detail.quantity) {
      throw new Error(`Insufficient stock for variant ID ${detail.id_variant_products}`);
    }
    if (existingDetail) throw new Error('Sale detail already exists for this product');

    const shoppingDetail = await this.shoppingRepository.findShoppingByVariant(
      detail.id_variant_products,
      { transaction }
    );
    if (!shoppingDetail) {
      throw new Error(`No purchase detail found for variant ID ${detail.id_variant_products}`);
    }

    const newSaleDetail = await this.salesVariantRepository.create(
      {
        ...detail,
        id_sale: saleId,
        subtotal: shoppingDetail.sale_price * detail.quantity
      },
      { transaction }
    );

    await this.variantRepository.updateStock(
      productVariant.id,
      productVariant.stock - detail.quantity,
      { transaction }
    );

    return newSaleDetail;
  }
}

module.exports = SaleService;