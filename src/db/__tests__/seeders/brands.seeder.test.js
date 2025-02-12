const {sequelize} = require('../../../models');
const {BrandModel} = require('../../../models/products/brands.entity');
const {BrandSeeder} = require('../../../db/seeders/20250210165220-brands');

describe('Seeders: Brands', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true});
        await BrandSeeder.up(sequelize.getQueryInterface(), sequelize);
    });

    afterAll(async () => {
        await BrandSeeder.down(sequelize.getQueryInterface(), sequelize);
        await sequelize.close();
    });


    test('should create a brand', async () => {
        const count = await BrandModel.count();
        expect(count).toBe(2);
    } )

    test('should drop a brand', async () => {
        await BrandSeeder.down(sequelize.getQueryInterface(), sequelize);
    
        const count = await Brand.count(); 
        expect(count).toBe(0); 
      });

});
