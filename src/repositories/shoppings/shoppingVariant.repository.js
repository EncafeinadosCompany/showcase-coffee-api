const { ShoppingVariantModel } = require('../../models/shoppings/shoppingVariant.entity');

class ShoppingVariantRepository {
    constructor() { }

    async getAll() {
        const shoppingVariant = await ShoppingVariantModel.findAll(
            {
                attributes: [
                    'id_shopping',
                    'id_variant_products',
                    'sale_prices',
                    'shopping_prices',
                    [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_stock'],
                ],
                group: ['id_variant_products','shopping_prices','sale_prices'],
                raw: true
            }
        );
        return shoppingVariant;
    }

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

}

module.exports = ShoppingVariantRepository