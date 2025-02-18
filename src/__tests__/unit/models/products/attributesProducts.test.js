    require('../../../setup');
    const { AttributeProductModel } = require('../../../../models/products/attributesProducts.entity');
    const {AttributeModel} = require('../../../../models/products/attribute.entity')
    const {ProductModel} = require('../../../../models/products/products.entity')


    describe('🧪 AttributeProductModel - Database Model Tests', () => {
        let attributeProductData;

        beforeAll(async () => {
        
            // Inserta datos de prueba en las tablas relacionadas
            await AttributeModel.create({  description: 'Sample Attribute',
                created_at: new Date(),
                updated_at: new Date() });
            await ProductModel.create({ image: 'https://example.com/image.jpg',
                name: 'Sample Product',
                status: true,
                id_brand: 1,
                image_url: 'https://example.com/image.jpg',
                created_at: new Date(),
                updated_at: new Date() });
        });

        beforeEach(() => {
            // Datos de prueba
            attributeProductData = {
                value: 'Sample Value',
                id_attribute: 1,
                id_product: 1,
                created_at: new Date(),
                updated_at: new Date()
            };
        });

        afterEach(async () => {
            await AttributeProductModel.destroy({ where: { value: 'Sample Value' } });
        });


        test('should create a new attribute product', async () => {
            const attributeProduct = await AttributeProductModel.create(attributeProductData);

            expect(attributeProduct).toBeDefined();
            expect(attributeProduct.id).toBeDefined();
            expect(attributeProduct.value).toBe(attributeProductData.value);
            expect(attributeProduct.id_attribute).toBe(attributeProductData.id_attribute);
            expect(attributeProduct.id_product).toBe(attributeProductData.id_product);
            expect(attributeProduct.created_at).toEqual(attributeProductData.created_at);
            expect(attributeProduct.updated_at).toEqual(attributeProductData.updated_at);
        });
    });
