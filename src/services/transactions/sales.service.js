class SaleService {

  constructor(SalesRepository, VariantRepository, ShoppingVariantRepository, SalesVariantRepository, sequelize) 
  {
    this.saleRepository = SalesRepository,
    this.variantRepository = VariantRepository,
    this.shoppingRepository = ShoppingVariantRepository,
    this.salesVariantRepository = SalesVariantRepository,
    this.sequelize = sequelize;
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
      if (!data.sale || !data.details || data.details.length === 0) {
        throw new Error('Invalid sales data: information is missing from the sale or in the details.');
      }

      const sale = await this.saleRepository.create(data.sale, { transaction });
      
      let total = 0;
      for (const detail of data.details) {

        detail.id_sale = sale.id;

        const newSaleDetail = await this.createSaleVariant(detail, transaction);
        total += Number(newSaleDetail.subtotal);
      }

      console.log('total'+ total);

      const newSale = await this.saleRepository.updateTotal(sale.id, { total }, { transaction });

      await transaction.commit();

      return newSale;
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Sale creation failed: ${error.message}`);
    }
  }

  async createSaleVariant(saleDetailData, transaction) {
    if (!saleDetailData.id_variant_products || !saleDetailData.quantity) {
      throw new Error('Invalid sales detail data: missing product information');
    }

    const [sale, productVariant] = await Promise.all([
      this.saleRepository.getById(saleDetailData.id_sale, { transaction }),
      this.variantRepository.findByIdVariant(saleDetailData.id_variant_products, { transaction })
    ]);

    if (!sale) throw new Error('Sale not found');
    if (!productVariant) throw new Error('Variant product not found');
    if (productVariant.stock < saleDetailData.quantity) {
      throw new Error(`Insufficient stock for variant ID ${saleDetailData.id_variant_products}`);
    }

    const shoppingDetail = await this.shoppingRepository.findShoppingByVariant(saleDetailData.id_variant_products, { transaction });

    if (!shoppingDetail) throw new Error(`No purchase detail found for variant ID ${saleDetailData.id_variant_products}`);
  
    const subtotal = shoppingDetail.sale_price * saleDetailData.quantity;
    console.log('subtotal'+ subtotal);

    const existingDetail = await this.salesVariantRepository.findByShoppingAndProduct(
      saleDetailData.id_sale,
      saleDetailData.id_variant_products,
      { transaction }
    );

    if (existingDetail) throw new Error('Sale detail already exists for this product');

    const newSaleDetail = await this.salesVariantRepository.create(
      { ...saleDetailData, subtotal },
      { transaction }
    );

    await this.variantRepository.updateStock(
      productVariant.id,
      productVariant.stock - saleDetailData.quantity,
      { transaction }
    );

    return newSaleDetail;
  };

}

module.exports = SaleService