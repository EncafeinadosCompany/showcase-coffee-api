
const {AttributeProductModel} = require('../../models/products/attributesProducts.entity');

class AttributeProductsRepository {
    constructor (){}

    async getAll (){
        return await AttributeProductModel.findAll()
    }

    async getById(id) {
        return await AttributeProductModel.findByPk(id) 
    }

    async create(Attribute){
        return await AttributeProductModel.create(Attribute) 
    }

}

module.exports = AttributeProductsRepository;