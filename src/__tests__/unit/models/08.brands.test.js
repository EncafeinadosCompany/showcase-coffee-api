require('../../setup');
const { BrandModel } = require('../../../models/products/brands.entity');

describe('🧪 BrandModel - Database Model Tests', () => {
    let brandData;

    beforeEach(() => {
        brandData = {
            name: 'Sample Brand',
            description: 'This is a sample brand description',
            created_at: new Date(),
            updated_at: new Date()
        };
    });

    afterEach(async () => {
        await BrandModel.destroy({ where: { name: 'Sample Brand' } });
    });


    test('should create a new brand', async () => {
        const brand = await BrandModel.create(brandData);

        expect(brand).toBeDefined();
        expect(brand.id).toBeDefined();
        expect(brand.name).toBe(brandData.name);
        expect(brand.description).toBe(brandData.description);
        expect(brand.created_at).toEqual(brandData.created_at);
        expect(brand.updated_at).toEqual(brandData.updated_at);
    });
});
