require('../../../setup');
const { AttributeModel } = require('../../../../models/products/attribute.entity');

describe('🧪 AttributeModel - Database Model Tests', () => {
    let attributeData;

    beforeEach(() => {
        // Datos de prueba
        attributeData = {
            description: 'Sample Attribute',
            created_at: new Date(),
            updated_at: new Date()
        };
    });
    
    afterEach(async () => {
        await AttributeModel.destroy({ where: { description: 'Sample Attribute' } });
    });

    test('should create a new attribute', async () => {
        const attribute = await AttributeModel.create(attributeData);

        expect(attribute).toBeDefined();
        expect(attribute.id).toBeDefined();
        expect(attribute.description).toBe(attributeData.description);
        expect(attribute.created_at).toEqual(attributeData.created_at);
        expect(attribute.updated_at).toEqual(attributeData.updated_at);
    });
});
