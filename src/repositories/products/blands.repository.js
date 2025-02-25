const {BrandModel} = require('../../models/products/brands.entity');
const { ProductModel } = require('../../models/products/products.entity');
const {SocialNetworkModel} = require ('../../models/products/socialNetworks.entity')
const {SocialBrandModel} = require ('../../models/products/social_brands.entity')
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
            {
              model:SocialBrandModel,
              as: 'social_networks',
              attributes: ['description', 'url'],
              include: [
                {
                  model: SocialNetworkModel,
                  as: 'social_network',
                  attributes: ['id', 'name']
                }
              ]

            }
          ]
        })
    }

    async getById(id) {
        const brands = await BrandModel.findOne({
          where: {
            id
          },
          include: [
            {
              model: ProductModel,
              as: "products",
              attributes: ['id','name','status','created_at'],
            },
            {
              model:SocialBrandModel,
              as: 'social_networks',
              attributes: ['description', 'url'],
              include: [
                {
                  model: SocialNetworkModel,
                  as: 'social_network',
                  attributes: ['id', 'name']
                }
              ]

            }
          ],
        });
        return ! brands? null : brands;
      }
    

    async create (brand){
        return await BrandModel.create(brand) 
    }

    async countBrands() {
      return await BrandModel.count();
  }
}

module.exports = BrandRepository;