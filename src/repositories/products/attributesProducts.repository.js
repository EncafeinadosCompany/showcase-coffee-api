
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

    async update(Attribute){
        return await AttributeProductModel.update(Attribute, {where: {id_product:Attribute.id_product, id_attribute:Attribute.id_attribute}})
    }

    async filterDrop (id){
        const attributes =  await AttributeProductModel.findAll({where: {id_product:id}})
        return attributes
    }

    async delete (Attribute){
        return await AttributeProductModel.destroy({where: {id_product:Attribute.id_product , id_attribute:Attribute.id_attribute}})
    }

}

module.exports = AttributeProductsRepository;