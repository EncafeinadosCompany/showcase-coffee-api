

const { SocialNetworkModel } = require('../../models/products/socialNetworks.entity');
const { SocialBrandModel } = require('../../models/products/social_brands.entity');
class SocialNetworksRepository {
    constructor (){}

    async getAllNetworks(){
        return await SocialNetworkModel.findAll();
    }

    async getNetworkById(id){
        return await SocialNetworkModel.findByPk(id);
    }

    async createSocialNetworks(network){
        return await SocialBrandModel.create(network);
    }


    async delete (id){
        await SocialBrandModel.destroy({where: {id_brand: id}})
        return true     
    }

}

module.exports = SocialNetworksRepository 