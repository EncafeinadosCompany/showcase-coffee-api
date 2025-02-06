
const {ShoppingsModel} = require('../../models/transactions/shoppings.entity');

class ShoppingRepository {
    constructor(){}

    async getAll(){
        const shopping = await ShoppingsModel.findAll();
        return shopping;
    }
    async getById(id){
        const shopping = await ShoppingsModel.findByPk(id);
        return shopping;
    }

    async create(shoppingData){
        const newShopping= await ShoppingsModel.create(shoppingData);
        return newShopping;
    }
}

module.exports= ShoppingRepository