const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { ProductModel } = require('../../models/products/products.entity');
const { VariantProductModel } = require('../../models/products/variantsProducts.entity');

const  sequelize  = require('../../config/connection');
const { Op, fn, col, literal} = require('sequelize');
const { EmployeeModel } = require('../../models/users/employees.entity');
const { ShoppingModel } = require('../../models/transactions/shopping.entity');

class ShoppingVariantRepository {
    constructor() { }

    async getAll() {
        try {
            const shoppingVariant = await ShoppingVariantModel.findAll({
                attributes: ["id", "sale_price"],
                include: [
                    {
                        model: VariantProductModel,
                        as: "variant",
                        attributes: ["id", "grammage", "stock"],
                        include: [
                            {
                                model: ProductModel,
                                as: "product",
                                attributes: ["id", "name"]
                            }
                        ]
                    },

                ],
                group: [
                    "ShoppingVariantModel.id",
                    "sale_price",
                    "variant.id",
                    "variant.product.id",
                    "variant.product.name",
                ]
            });

            return shoppingVariant;
        } catch (error) {
            console.error("Error en la consulta:", error);
            throw new Error("Hubo un problema al obtener los datos.");
        }
    };

    async getVariantByShoppingId(id_shopping) {
        try {
            const shoppingVariants = await ShoppingVariantModel.findAll({
                where: { id_shopping },
                include: [
                    {
                        model: VariantProductModel,
                        as: "variant",
                        attributes: ["id", "grammage", "stock"],
                        include: [
                            {
                                model: ProductModel,
                                as: "product",
                                attributes: ["id", "name"]
                            }
                        ]
                    }
                ]
            });

            return shoppingVariants;
        } catch (error) {
            console.error("Error al obtener los detalles de compra:", error);
            throw new Error("Hubo un problema al obtener los detalles de compra.");
        }
    }

    async getById(id) {
        const shoppingVariant = await ShoppingVariantModel.findByPk(id);
        return shoppingVariant;
    };

    async getAvailableStock(variantId, transaction) {
        return ShoppingVariantModel.findAll({
            where: {
                id_variant_products: variantId,
                // Solo incluir registros donde aún hay stock disponible
                remaining_quantity: {
                    [Op.gt]: 0
                }
            },
            include: [{
                model: ShoppingModel,
                as: 'shopping',
                include: [{
                    model: EmployeeModel,
                    as: 'employee',
                    attributes: ['id_provider']
                }]
            }],
            order: [['created_at', 'ASC']],
            transaction
        });
    };

    async updateRemainingQuantity(id, newQuantity, transaction) {
        return ShoppingVariantModel.update(
            { remaining_quantity: newQuantity },
            {
                where: { id },
                transaction
            }
        );
    };

    async getProviderByShoppingVariant(id, options = {}) {
        try {
            const shoppingVariant = await ShoppingVariantModel.findByPk(id, {
                include: [
                    {
                        model: ShoppingModel,
                        as: 'shopping',
                        attributes: ['id', 'id_employee'],
                        include: [
                            {
                                model: EmployeeModel,
                                as: 'employee',
                                attributes: ['id_provider']
                            }
                        ]
                    }
                ],
                ...options
            });
            return shoppingVariant ? shoppingVariant.shopping.employee.id_provider : null;
        } catch (error) {
            console.error('Error fetching shopping variant by id:', error);
            throw error;
        }
    };

    async create(shoppingData) {
        const newShoppingVariant = await ShoppingVariantModel.create(shoppingData);
        return newShoppingVariant;
    }

    async findByShoppingAndProduct(id_shopping, id_variant_products, options = {}) {
        try {
            const shoppingVariant = await ShoppingVariantModel.findOne({
                where: {
                    id_shopping,
                    id_variant_products
                },
                ...options
            });
            return shoppingVariant;
        } catch (error) {
            console.error('Error fetching shopping variant by shopping and product:', error);
            throw error;
        }
    }

    async findShoppingByVariant(id_variant_products) {
        try {
            const shoppingVariant = await ShoppingVariantModel.findOne({
                where: { id_variant_products },
                order: [['created_at', 'DESC']],
            });
            return shoppingVariant;
        } catch (error) {
            console.error('Error fetching latest shopping variant by variant:', error);
            throw error;
        }
    }

    // async ProducTopData(month, year) {
    //     try {
    //         const startDate = new Date(year, month - 1, 1); // Primer día del mes
    //         const endDate = new Date(year, month, 0, 23, 59, 59); // Último día del mes
    
    //         const products = await ShoppingVariantModel.findAll({
    //             attributes: [
    //                 [fn("sum", col("quantity")), "total"], // Suma la cantidad total de cada variante
    //                 "id_variant_products"
    //             ],
    //             include: [
    //                 {
    //                     model: ShoppingModel, // Relación con la tabla de compras
    //                     as: 'shopping', // Alias para la relación
    //                     attributes: [], // No necesitamos datos adicionales
    //                     where: {
    //                         created_at: {
    //                             [Op.between]: [startDate, endDate] // Filtrar por fecha en ShoppingModel
    //                         }
    //                     }
    //                 }
    //             ],
    //             group: ["id_variant_products"], // Agrupar por producto
    //             order: [[literal("total"), "DESC"]], // Ordenar por cantidad vendida
    //             limit: 5 // Limitar a los 5 más vendidos
    //         });
    
    //         return products;
    //     } catch (error) {
    //         console.error("Error fetching top products:", error.message);
    //         throw error;
    //     }
    // }

    // async EarlyDateData (){

    //     try {


    //     }catch(error){
    //         cosole.error('Error fetching date totion', error.message);      
    //     }
    // }

}

module.exports = ShoppingVariantRepository