const { SalesVariantModel } = require('../../models/transactions/salesVariant.entity');
const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { VariantProductModel } = require('../../models/products/variantsProducts.entity');
const { ProductModel } = require('../../models/products/products.entity');
const { SalesModel } = require('../../models/transactions/sales.entity');
const { Op, fn, col, literal, Sequelize } = require('sequelize');

class SaleVariantRepository {
    constructor() { }

    async getAll() {
        const salesVariant = await SalesVariantModel.findAll();
        return salesVariant
    }
    async getById(id) {
        const salesVariant = await SalesVariantModel.findByPk(id);
        return salesVariant
    }

    async create(SalesVariantData) {
        const newSaleVariant = await SalesVariantModel.create(SalesVariantData);
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
            const startDate = new Date(year, month - 1, 1); 
            const endDate = new Date(year, month, 0, 23, 59, 59);

            const products = await SalesVariantModel.findAll({
                attributes: [
                    [fn("sum", col("quantity")), "total"],
                    "id_variant_products"
                ],
                include: [
                    {
                        model: VariantProductModel,
                        as: "variantProduct",
                        attributes: ["grammage"],
                        include: [
                            {
                                model: ProductModel,
                                as: "product",
                                attributes: ["name", "image_url"]
                            }
                        ]
                    },
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
                group: [
                    "id_variant_products", 
                    "variantProduct.id", 
                    "variantProduct.grammage", 
                    "variantProduct->product.id", 
                    "variantProduct->product.name"
                ],
                order: [[literal("total"), "DESC"]],
                limit: 5
            });

            return products;
        } catch (error) {
            console.error("Error fetching top products:", error.message);
            throw error;
        }
    }

    async getMonthlyEarnings(month, year) {
        const sales = SalesModel.findAll({
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('DATE_PART', 'month', Sequelize.col('date')),
                        month
                    ),
                    Sequelize.where(
                        Sequelize.fn('DATE_PART', 'year', Sequelize.col('date')),
                        year
                    ),
                ],
            },
            include: {
                model: SalesVariantModel,
                as: "sales_variant",
                include: {
                    model: ShoppingVariantModel,
                    as: "shoppingVariant",
                    attributes: ["shopping_price", "sale_price"],
                },
            },
        });

        return sales;
    }


    async getEarningsByProduct(id_variant_products) {
        try {
            const salesVariants = await SalesVariantModel.findAll({
                where: { id_variant_products },
                include: {
                    model: ShoppingVariantModel,
                    as: 'shoppingVariant',
                    attributes: ['shopping_price', 'sale_price']
                }
            });
            let totalEarnings = 0;

            salesVariants.forEach(variant => {
                const { shopping_price, sale_price } = variant.shoppingVariant;
                totalEarnings += (sale_price - shopping_price) * variant.quantity;
            });

            return totalEarnings;
        } catch (error) {
            console.error('Error fetching earnings by product:', error.message);
            throw new Error('Error fetching earnings by product.');
        }
    }

    async getYearlyEarnings(year) {
        try {
            const sales = await SalesModel.findAll({
                where: {
                    [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('DATE_PART', 'year', Sequelize.col('date')),
                        year
                    )]
                },
                include: {
                    model: SalesVariantModel,
                    as: "sales_variant",
                    include: {
                        model: ShoppingVariantModel,
                        as: "shoppingVariant",
                        attributes: ["shopping_price", "sale_price"],
                    },
                },
            });

            const monthlyEarnings = {};

            sales.forEach(sale => {
                const month = sale.date.getMonth() + 1;
                if (!monthlyEarnings[month]) {
                    monthlyEarnings[month] = 0;
                }
                sale.sales_variant.forEach(variant => {
                    const { shopping_price, sale_price } = variant.shoppingVariant;
                    monthlyEarnings[month] += (sale_price - shopping_price) * variant.quantity;
                });
            });

            return monthlyEarnings;
        } catch (error) {
            console.error('Error fetching yearly earnings:', error.message);
            throw new Error('Error fetching yearly earnings.');
        }
    }
    
    async getSalesByMonthAndYear(month, year) {
        const startDate = new Date(year, month - 1, 1); 
        const endDate = new Date(year, month, 0); 

        const sales = await SalesVariantModel.findAll({
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate], 
                },
            },
            include: [
                {
                    model: ShoppingVariantModel,
                    as: 'shoppingVariant',
                    attributes: ['shopping_price', 'sale_price'],
                },
            ],
        });

        return sales;
    }

    async getSalesByYear(year) {
        const startDate = new Date(year, 0, 1); 
        const endDate = new Date(year, 11, 31); 

        const sales = await SalesVariantModel.findAll({
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate], 
                },
            },
            include: [
                {
                    model: ShoppingVariantModel,
                    as: 'shoppingVariant',
                    attributes: ['shopping_price', 'sale_price'],
                },
            ],
        });

        return sales;
    }

    async getSalesCountByMonth(month, year) {
        const startDate = new Date(year, month - 1, 1); // Primer día del mes
        const endDate = new Date(year, month, 0); // Último día del mes

        const salesCount = await SalesVariantModel.count({
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate], // Filtra por el rango de fechas
                },
            },
        });

        return salesCount;
    }

    // Método para obtener la cantidad de ventas del año
    async getSalesCountByYear(year) {
        const startDate = new Date(year, 0, 1); // Primer día del año
        const endDate = new Date(year, 11, 31); // Último día del año

        const salesCount = await SalesVariantModel.count({
            where: {
                created_at: {
                    [Op.between]: [startDate, endDate], // Filtra por el rango de fechas
                },
            },
        });

        return salesCount;
    }


}

module.exports = SaleVariantRepository