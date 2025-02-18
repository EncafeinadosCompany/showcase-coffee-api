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
                    [fn("sum", col("quantity")), "total"], // Suma la cantidad total de cada variante
                    "id_variant_products"
                ],
                include: [
                    {
                        model: SalesModel, // Relación con la tabla de compras
                        as: 'sale', // Alias para la relación
                        attributes: [], // No necesitamos datos adicionales
                        where: {
                            created_at: {
                                [Op.between]: [startDate, endDate] // Filtrar por fecha en ShoppingModel
                            }
                        }
                    }
                ],
                group: ["id_variant_products"], // Agrupar por producto
                order: [[literal("total"), "DESC"]], // Ordenar por cantidad vendida
                limit: 5 // Limitar a los 5 más vendidos
            });
    
            return products;
        } catch (error) {
            console.error("Error fetching top products:", error.message);
            throw error;
        }
    }
}

module.exports= SaleVariantRepository