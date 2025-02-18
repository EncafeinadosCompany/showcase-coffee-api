require('../../setup');
const { ProductModel } = require('../../../models/products/products.entity');

describe('🧪 ProductModel - Database Model Tests', () => {
    let productData;

    beforeEach(() => {
        // Datos de prueba
        productData = {
            image: 'https://example.com/image.jpg',
            name: 'Sample Product',
            status: true,
            id_brand: 1,
            image_url: 'https://example.com/image.jpg',
            created_at: new Date(),
            updated_at: new Date()
        };
    });

    afterEach(async () => {
        await ProductModel.destroy({ where: { name: 'Sample Product' } });
    });


    test('should create a new product', async () => {
        const product = await ProductModel.create(productData);

        expect(product).toBeDefined();
        expect(product.id).toBeDefined();
        expect(product.name).toBe(productData.name);
        expect(product.status).toBe(productData.status);
        expect(product.id_brand).toBe(productData.id_brand);
        expect(product.image_url).toBe(productData.image_url);
        expect(product.created_at).toEqual(productData.created_at);
        expect(product.updated_at).toEqual(productData.updated_at);
    });
});
