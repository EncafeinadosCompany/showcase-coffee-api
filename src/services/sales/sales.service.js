const SalesRepository = require('../../repositories/sales/sales.repository');
const SalesVariantRepository = require('../../repositories/sales/salesVariant.repository');
const ProductVariantsRepository = require('../../repositories/products/products.repository');
const {sequelize} = require('../../config/connection');

class SaleService {
  constructor() {
    this.saleRepository = new SalesRepository(),
      this.salesVariantRepository = new SalesVariantRepository(),
      this.productsVariantRepository = new ProductVariantsRepository()
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

  async createSaleWithDetails(saleData, detailsData) {
    const transaction = await sequelize.transaction();
    try {
      const newSale = await this.saleRepository.create(saleData, { transaction });

      await Promise.all(detailsData.map(async (detail) => {
        detail.id_sales = newSale.id;

        await this.salesVariantRepository.create(detail, { transaction });
      }));

      await transaction.commit();
      return newSale;
    } catch (error) {
      await transaction.rollback();
      throw new Error('SERVICE: ' + error.message);
    }
  }



  async createSaleVariant(saleDetailData) {
    const transaction = await sequelize.transaction();
    try {
      const sale = await this.saleRepository.getById(saleDetailData.id_sales, { transaction });
      if (!sale) throw new Error('SERVICE: Sale not found.');

      const existingDetail = await this.salesVariantRepository.findByShoppingAndProduct(
        saleDetailData.id_sales,
        saleDetailData.id_variant_products,
        { transaction }
      );

      if (existingDetail) {
        throw new Error('A sale detail already exists with this product.');
      }

      const newSaleDetail = await this.salesVariantRepository.create(saleDetailData, { transaction });

      // Actualizar el stock del producto variante
      const productVariant = await this.productsVariantRepository.findById(saleDetailData.id_variant_products, { transaction });
      if (!productVariant) throw new Error('SERVICE: Variant product not found.');

      const newStock = productVariant.stock - saleDetailData.quantity;
      await this.productsVariantRepository.updateStock(productVariant.id, newStock, { transaction });

      await transaction.commit();
      return newSaleDetail;
    } catch (error) {
      await transaction.rollback();
      throw new Error('SERVICE:' + error.message);
    }
  }

      async getAllSaleVariant() {
      try {
        const saleVariant = await this.salesVariantRepository.getAll();
        return saleVariant;
      } catch (error) {
        console.error('SERVICE: Error in service layer while fetching all sale variants:', error);
        throw error;
      }
    }

    async getSaleVariantById(id) {
      try {
        const saleVariant = await this.salesVariantRepository.getById(id);
        return saleVariant;
      } catch (error) {
        console.error(`SERVICE: Error in service layer while fetching sale variants with id ${id}:`, error);
        throw error;
      }
    }
  }

module.exports = SaleService