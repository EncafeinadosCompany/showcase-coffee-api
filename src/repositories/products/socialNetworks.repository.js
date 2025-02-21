

const { SocialNetworkModel } = require('../../models/products/socialNetworks.entity');
const { SocialBrandModel } = require('../../models/products/social_brands.entity');
class SocialNetworksRepository {
    constructor (){}

    async getAllNetworks(){
        return await SocialNetworkModel.findAll();
    }

    async getNetworkById(id){
        console.log('id',id)
        return await SocialNetworkModel.findByPk(id);
    }

    async createSocialNetworks(network){
        return await SocialBrandModel.create(network);
    }
}

module.exports = SocialNetworksRepository 