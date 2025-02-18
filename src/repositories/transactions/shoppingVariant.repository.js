const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { ProductModel } = require('../../models/products/products.entity');
const { VariantProductModel } = require('../../models/products/variantsProducts.entity');

const { Op, fn, col, literal, Sequelize, where } = require('sequelize');
const { EmployeeModel } = require('../../models/users/employees.entity');
const { ShoppingModel } = require('../../models/transactions/shopping.entity');

class ShoppingVariantRepository {
    constructor() { }


    async getAll() {
        try {

            const subQuery = await this.getMinRoastingDate();

            const shoppingVariant = await ShoppingVariantModel.findAll({
                attributes: ["id", "sale_price", "roasting_date", "quantity", "remaining_quantity"],
                include: [
                    {
                        model: VariantProductModel,
                        as: "variant",
                        attributes: ["id", "grammage", "stock"],
                        include: [
                            {
                                model: ProductModel,
                                as: "product",
                                attributes: ["id", "name"],

                            }
                        ]
                    }
                ],
                where: {
                    [Op.and]: [
                        {
                            roasting_date: { [Op.in]: subQuery.map(sq => sq.min_roasting_date) }, // ✅ Solo la variante con la fecha de tostión más antigua
                            remaining_quantity: { [Op.gt]: 0 }
                        }

                    ],

                },
                order: [
                    [Sequelize.col('variant.product.id'), "ASC"],
                    ["roasting_date", "ASC"]
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

        const subQuery = await this.getMinRoastingDate();

        return ShoppingVariantModel.findAll({
            where: {
                id_variant_products: variantId,
                // Solo incluir registros donde aún hay stock disponible
                remaining_quantity: {
                    [Op.gt]: 0
                },
                roasting_date: { [Op.in]: subQuery.map(sq => sq.min_roasting_date) }

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

    async getByClosestRoastingDate() {
        try {
            const today = new Date();
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(today.getMonth() - 1);

            const variants = await ShoppingVariantModel.findAll({
                attributes: [
                    "id",
                    "roasting_date",
                    "remaining_quantity",
                    "sale_price"
                ],
                include: [
                    {
                        model: ShoppingModel,
                        as: "shopping",
                        attributes: ['id', 'id_employee'],
                        include: [
                            {
                                model: EmployeeModel,
                                as: 'employee',
                                attributes: ['id_provider']
                            }
                        ]
                    },
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
                ],
                where: {
                    roasting_date: {
                        [Op.between]: [threeMonthsAgo, today]
                    }
                },
                order: [["roasting_date", "ASC"]]
            });

            return variants;
        } catch (error) {
            console.error("Error fetching variants by roasting date:", error);
            throw error;
        }
    }

    async getEarning (id_variant){

        const earning = await ShoppingVariantModel.findOne({
            where: { id_variant_products: id_variant },
            attributes: [
                "shopping_price",
                "sale_price",
                [Sequelize.literal('"sale_price" - "shopping_price"'), "earnings"] // Columna calculada
            ]
        })

        return earning

    }
    private
    async getMinRoastingDate() {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 1);

        const query = await ShoppingVariantModel.findAll({
            attributes: [
                [Sequelize.fn("MIN", Sequelize.col("roasting_date")), "min_roasting_date"],
                "id_variant_products"
            ],
            where: {
                roasting_date: {
                    [Op.between]: [threeMonthsAgo, new Date()]
                },

                remaining_quantity: { [Op.gt]: 0 }

            },
            group: ["id_variant_products"],
            raw: true
        });


        return query
    }


}

module.exports = ShoppingVariantRepository