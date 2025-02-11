
const {ShoppingModel} = require('../../models/transactions/shopping.entity');

class ShoppingRepository {
    constructor(){}

    async getAll(){
        const shopping = await ShoppingModel.findAll();
        return shopping;
    }
    async getById(id){
        const shopping = await ShoppingModel.findByPk(id);
        return shopping;
    }

    async create(shoppingData){
        const newShopping= await ShoppingModel.create(shoppingData);
        return newShopping;
    }
}

module.exports= ShoppingRepository