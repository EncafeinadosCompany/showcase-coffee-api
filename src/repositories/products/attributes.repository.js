
const {AttributeModel} = require('../../models/products/attribute.entity');
class AttributeRepository {
    constructor (){}

    async getAll (){
        return await AttributeModel.findAll()
    }

    async find(description) {
        const Attribute = await AttributeModel.findOne({
            where: { description: description },
        });
        return Attribute
    }

    async create (Attribute){
        return await AttributeModel.create(Attribute) 
    }

}

module.exports = AttributeRepository;