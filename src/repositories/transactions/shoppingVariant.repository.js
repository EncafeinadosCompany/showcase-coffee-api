const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { ProductModel } = require('../../models/products/products.entity');
const { VariantProductModel } = require('../../models/products/variantsProducts.entity');
class ShoppingVariantRepository {
    constructor() { }

    async getAll() {
        try {
            const shoppingVariant = await ShoppingVariantModel.findAll({
                include: [
                    {
                        model: VariantProductModel,
                        as: "variant",
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
            return shoppingVariant;
        } catch (error) {
            console.error("Error en la consulta:", error);
            throw new Error("Hubo un problema al obtener los datos.");
        }
    };

    async getById(id) {
        const shoppingVariant = await ShoppingVariantModel.findByPk(id);
        return shoppingVariant;
    }

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
    
}

module.exports = ShoppingVariantRepository