
const {SalesVariantModel} = require('../../models/sales/salesVariant.entity');

class SaleVariantRepository {
    constructor(){}

    async getAll(){
        return salesVariant = await SalesVariantModel.findAll();
    }
    async getById(id){
        return salesVariant = await SalesVariantModel.findByPk(id);
    }

    async create(SalesVariantData){
        return newSaleVariant= await SalesVariantModel.create(SalesVariantData);
    }

    async findByShoppingAndProduct(id_sales, id_variant_products, options = {}) {
        try {
            const saleVariant = await SalesVariantModel.findOne({
                where: {
                    id_sales,
                    id_variant_products
                },
                ...options
            });
            return saleVariant;
        } catch (error) {
            console.error('Error fetching sale variant by sale and product:', error);
            throw error;
        }
    }
}

module.exports= SaleVariantRepository