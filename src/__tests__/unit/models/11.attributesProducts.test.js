require('../../setup');
const { AttributeProductModel } = require('../../../models/products/attributesProducts.entity');

describe('🧪 AttributeProductModel - Database Model Tests', () => {
    let attributeProductData;

    beforeEach(() => {

        attributeProductData = {
            id_attribute: 1,
            id_product: 1,
            value: 'Ejemplo',
            created_at: new Date(),
            updated_at: new Date()
        };
    });

    afterEach(async () => {
        await AttributeProductModel.destroy({ where: {  value: 'Ejemplo' } });
    });

    test('should create a new attribute product', async () => {

        const attributeProduct = await AttributeProductModel.create(attributeProductData);

        expect(attributeProduct).toBeDefined();
        expect(attributeProduct.id).toBeDefined();
        expect(attributeProduct.value).toBe(attributeProductData.value);
        expect(attributeProduct.id_attribute).toBe(attributeProductData.id_attribute);
        expect(attributeProduct.id_product).toBe(attributeProductData.id_product);
    });
});
