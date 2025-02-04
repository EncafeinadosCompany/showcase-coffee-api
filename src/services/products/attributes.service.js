
const AttributeRepository = require('../../repositories/products/attributes.repository');
const  AttributeProductsRepository= require('../../repositories/products/attributesProducts.repository');
const {sequelize} = require('../../config/connection');

class AttributeService {
    constructor() {
        this.attributeProductsRepository =  new AttributeProductsRepository();
        this.attributeRepository = new AttributeRepository();
    }
    
    async getAll() {
        return this.attributeRepository.getAll({
            include: [
                {
                    model: AttributeProductsRepository,
                    as: 'details',
                    attributes: ['id', 'value']
                }
            ]
        });
    }

    async getAttributesID(id){
        return this.attributeRepository.getById(id);
    }



    async createAttribute(attributeData) {

        const transaction = await sequelize.transaction();

        try{

            const newAttribute = await this.attributeRepository.create(attributeData , {transaction});

            await transaction.commit();

            return newAttribute;
          } catch (error) {

            await transaction.rollback();
            throw new Error('SERVICE: ' + error.message);
          }
    }
}

module.exports = AttributeService;