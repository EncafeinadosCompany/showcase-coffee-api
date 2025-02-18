const { ShoppingModel } = require('../../models/transactions/shopping.entity');

class ShoppingRepository {

    constructor() { }

    async getAll() {
        return await ShoppingModel.findAll({
            order:[
                ['id','DESC']
            ]
        });
    };

    async getById(id) {
        return await ShoppingModel.findByPk(id);
    };

    async create(shoppingData) {
        return await ShoppingModel.create(shoppingData);
    };

}

module.exports = ShoppingRepository;