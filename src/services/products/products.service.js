const { sequelize } = require('../../config/connection');
const { cloudinary } = require('../../config/cloudinary'); // No uses `upload`

class ProductService {
    
    constructor (ProductRepository, AttributeProductsRepository, AttributeRepository) {
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
        console.log(product, attributes
            
        )
        const transaction = await sequelize.transaction();
        let image_url;

        try {
            // Subimos la imagen a Cloudinary si el usuario la proporcionó
                if (product.image_url ) {
                    image_url = product.image_url;
                } 
            else {
                image_url = "https://res.cloudinary.com/dllvnidd5/image/upload/v1740162681/images-coffee/1740162774098-coffee%20bean-pana.png.png";
            }

            const data = {
                id: product.id,
                name: product.name,
                id_brand: product.id_brand,
                status: true,
                image_url: image_url
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
}

module.exports = ProductService;
