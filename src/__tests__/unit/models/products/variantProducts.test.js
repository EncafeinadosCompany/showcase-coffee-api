require('../../../setup');
const { VariantProductModel } = require('../../../../models/products/variantsProducts.entity');

describe('🧪 VariantProductModel - Database Model Tests', () => {
    let variantProductData;

    beforeEach(() => {
        // Datos de prueba
        variantProductData = {
            image: 'https://example.com/image.jpg',
            grammage: '500g',
            stock: 10,
            id_product: 1,
            image_url: 'https://example.com/image.jpg',
            created_at: new Date(),
            updated_at: new Date()
        };
    });

    afterEach(async () => {
        await VariantProductModel.destroy({ where: { image: 'https://example.com/image.jpg' } });
    });


    test('should create a new variant product', async () => {
        const variantProduct = await VariantProductModel.create(variantProductData);

        expect(variantProduct).toBeDefined();
        expect(variantProduct.id).toBeDefined();
        expect(variantProduct.image).toBe(variantProductData.image);
        expect(variantProduct.grammage).toBe(variantProductData.grammage);
        expect(variantProduct.stock).toBe(variantProductData.stock);
        expect(variantProduct.id_product).toBe(variantProductData.id_product);
        expect(variantProduct.image_url).toBe(variantProductData.image_url);
        expect(variantProduct.created_at).toEqual(variantProductData.created_at);
        expect(variantProduct.updated_at).toEqual(variantProductData.updated_at);
    });
});
