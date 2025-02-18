const {BrandModel} = require('../../models/products/brands.entity');
const { ProductModel } = require('../../models/products/products.entity');

class BrandRepository {
    constructor (){}

    async getAll (){
        return await BrandModel.findAll({ 
            include: [
            {
              model: ProductModel,
              as: "products",
              attributes: ['id','name','status','created_at'],
            },
          ]
        })
    }

    async getById(id) {
        const brands = await BrandModel.findByPk(id, {
          include: [
            {
              model: ProductModel,
              as: "products",
              attributes: ['id','name','status','created_at'],
            },
          ],
        });
        return ! brands? null : brands;
      }
    

    async create (brand){
        return await BrandModel.create(brand) 
    }
}

module.exports = BrandRepository;