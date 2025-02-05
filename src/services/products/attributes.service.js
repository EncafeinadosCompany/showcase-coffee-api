const {sequelize} = require('../../config/connection');

class AttributeService {
    constructor(AttributeProductsRepository, AttributeRepository) {
        this.attributeProductsRepository =  AttributeProductsRepository;
        this.attributeRepository = AttributeRepository;
    }
    
    async getAll() {
        return this.attributeRepository.getAll({
            include: [
                {
                    model: this.attributeProductsRepository,
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