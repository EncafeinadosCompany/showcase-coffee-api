const { SalesVariantModel } = require('../../models/transactions/salesVariant.entity');
const { SalesModel } = require('../../models/transactions/sales.entity');
const { Op, fn, col, literal} = require('sequelize');

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


    async ProducTopData(month, year) {
        try {
            const startDate = new Date(year, month - 1, 1); // Primer día del mes
            const endDate = new Date(year, month, 0, 23, 59, 59); // Último día del mes
    
            const products = await SalesVariantModel.findAll({
                attributes: [
                    [fn("sum", col("quantity")), "total"],
                    "id_variant_products"
                ],
                include: [
                    {
                        model: SalesModel, 
                        as: 'sale', 
                        attributes: [], 
                        where: {
                            created_at: {
                                [Op.between]: [startDate, endDate] 
                            }
                        }
                    }
                ],
                group: ["id_variant_products"], // Agrupar por producto
                order: [[literal("total"), "DESC"]], 
                limit: 5 
            });
    
            return products;
        } catch (error) {
            console.error("Error fetching top products:", error.message);
            throw error;
        }
    }



    // async earnings (month, year) {
    //     try {
    //         const startDate = new Date(year, month - 1, 1); // Primer día del mes
    //         const endDate = new Date(year, month, 0, 23, 59, 59); // Último día del mes
    
    //         const earnings = await SalesVariantModel.findAll({
    //             attributes: [
    //                 [fn("sum", col("subtotal")), "total"]
    //             ],
    //             include: [
    //                 {
    //                     model:
    //                 },
    //                 {
    //                     model: SalesModel, 
    //                     as: 'sale', 
    //                     attributes: [], 
    //                     where: {
    //                         created_at: {
    //                             [Op.between]: [startDate, endDate] 
    //                         }
    //                     }
    //                 }
    //             ],
    //         });
    
    //         return earnings;
    //     }
    // }
}

module.exports= SaleVariantRepository