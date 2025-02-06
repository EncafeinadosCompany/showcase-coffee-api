const { SalesVariantModel } = require('../../models/transactions/salesVariant.entity');

class SaleVariantRepository {
    constructor(){}

    async getAll(){
        const salesVariant = await SalesVariantModel.findAll();
        return salesVariant
    }
    async getById(id){
        const salesVariant = await SalesVariantModel.findByPk(id);
        return salesVariant
    }

    async create(SalesVariantData){
        const newSaleVariant= await SalesVariantModel.create(SalesVariantData);
        return newSaleVariant
    }

    async findByShoppingAndProduct(id_sale, id_variant_products, options = {}) {
        try {
            const saleVariant = await SalesVariantModel.findOne({
                where: {
                    id_sale,
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