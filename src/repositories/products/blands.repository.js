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

    


    async update(id, brand) {
      const brandUpdate = await BrandModel.findByPk(id);
      
      if (!brandUpdate) throw new Error("Brand not found");
  
      const [updatedRows] = await BrandModel.update(brand, { where: { id } });
  
      if (updatedRows === 0) {
          throw new Error(`No se pudo actualizar la marca con ID ${id}`);
      }
  
      return await BrandModel.findByPk(id); 
  }

    async countBrands() {
      return await BrandModel.count();
  }
}

module.exports = BrandRepository;