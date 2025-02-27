const { sequelize } = require('../../config/connection');
const { cloudinary } = require('../../config/cloudinary'); // No uses `upload`

class ProductService {

    constructor(ProductRepository, AttributeProductsRepository, AttributeRepository) {
        this.productRepository = ProductRepository;
        this.attributeProductsRepository = AttributeProductsRepository;
        this.attributeRepository = AttributeRepository;
    }

    async getAll() {
        return await this.productRepository.getAll();
    }

    async getById(id) {
        return await this.productRepository.getById(id);
    }

    async create(product, attributes) {
        const transaction = await sequelize.transaction();

        try {
            const data = {
                name: product.name,
                id_brand: product.id_brand,
                status: true,
                image_url: product.image_url
            };

            const newProduct = await this.productRepository.create(data, { transaction });

            await Promise.all(attributes.map(async (detail) => {
                let attribute = await this.attributeRepository.find(detail.description, { transaction });

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

    async updateProduct (id , product) {

        try{
            const newProduct = await this.productRepository.update(id, product);
           

            if(product.attributes && product.attributes.length > 0){
                
                const filterAttributes = await this.attributeProductsRepository.filterDrop(id);
                console.table(filterAttributes.dataValues)
                return filterAttributes;

            }


            return newProduct;
        }catch(error){
            throw new Error('SERVICE: ' + error.message);
        }
    }
}

module.exports = ProductService;
