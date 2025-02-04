class SaleService {

  constructor(SalesRepository, SalesVariantRepository, ProductVariantsRepository, sequelize) {
    this.saleRepository = SalesRepository,
      this.salesVariantRepository = SalesVariantRepository,
      this.productsVariantRepository = ProductVariantsRepository,
      this.sequelize = sequelize
  }

  async getAllSales() {
    try {
      const sales = await this.saleRepository.getAll();
      return sales;
    } catch (error) {
      console.error('SERVICE: Error in service layer while fetching all sales:', error);
      throw error;
    }
  }

  async getSalesById(id) {
    try {
      const sales = await this.saleRepository.getById(id);
      return sales;
    } catch (error) {
      console.error(`SERVICE: Error in service layer while fetching sale with id ${id}:`, error);
      throw error;
    }
  }

  async createSale(data) {
    const transaction = await this.sequelize.transaction();
    try {
      const newSale = await this.saleRepository.create(data.sale, { transaction });

      await Promise.all(data.details.map(async (detail) => {
        detail.id_sale = newSale.id;
        await this.createSaleVariant(detail, transaction);
      }));

      await transaction.commit();
      return newSale;

    } catch (error) {
      await transaction.rollback();
      throw new Error('SERVICE: ' + error.message);
    }
  };

  async createSaleVariant(saleDetailData, transaction) {
    try {
      const [sale, productVariant] = await Promise.all([
        this.saleRepository.getById(saleDetailData.id_sale, { transaction }),
        this.productsVariantRepository.findById(saleDetailData.id_variant_products, { transaction })
      ]);

      if (!sale) throw new Error('Sale not found');
      if (!productVariant) throw new Error('Variant product not found');
      if (productVariant.stock < saleDetailData.quantity) {
        throw new Error(`Not enough stock for variant ID ${saleDetailData.id_variant_products}`);
      }

      const existingDetail = await this.salesVariantRepository.findByShoppingAndProduct(
        saleDetailData.id_sale,
        saleDetailData.id_variant_products,
        { transaction }
      );

      if (existingDetail) throw new Error('Sale detail already exists with this product');

      const [newSaleDetail] = await Promise.all([
        this.salesVariantRepository.create(saleDetailData, { transaction }),
        this.productsVariantRepository.updateStock(
          productVariant.id,
          productVariant.stock - saleDetailData.quantity,
          { transaction }
        )
      ]);

      return newSaleDetail;
    } catch (error) {
      throw new Error('SERVICE: ' + error.message);
    }
  };

}

module.exports = SaleService