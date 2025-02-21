
const {sequelize} = require('../../config/connection');
class ProductService {
    
    constructor (ProductRepository, AttributeProductsRepository, AttributeRepository) {

    this.productRepository = ProductRepository
    this.attributeProductsRepository = AttributeProductsRepository
    this.attributeRepository = AttributeRepository
    }

    async getAll () {
        return await this.productRepository.getAll()
    }

    async getById (id){
        return await this.productRepository.getById(id);
    }

    async create (product, attributes){
         
        const transaction = await sequelize.transaction();

        try{

            const newProduct = await this.productRepository.create(product, {transaction});

    
            await Promise.all(attributes.map(async (detail) => {
          
            let attribute = await this.attributeRepository.find( detail.description,{transaction});

            await this.attributeProductsRepository.create({
                id_product: newProduct.id,
                id_attribute: attribute.id,
                value: detail.value 
            }, { transaction });
        }));

            await transaction.commit();
            return newProduct;
          } catch (error) {

            await transaction.rollback();
            throw new Error('SERVICE: ' + error.message);
          }
    }

    async updateImage(id, image_url) {
        return await this.productRepository.updateImage(id, image_url);
    }
}

module.exports = ProductService