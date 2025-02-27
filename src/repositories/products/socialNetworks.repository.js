

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

    async getByBrandId(id_brand) {
        try {
            return await SocialBrandModel.findAll({
                where: { id_brand: id_brand}
            });
        } catch (error) {
            console.error('❌ Error retrieving social networks:', error);
            throw new Error('Error retrieving social networks');
        }
    }

    async createSocialNetworks(network){
        return await  SocialBrandModel.create(network);
    }

    async deleteByIds(id_brand, idsToDelete) {
        try {
            await  SocialBrandModel.destroy({
                where: {
                    id_brand: id_brand,
                    id_social_network: idsToDelete
                }
            });
            console.log(`✅ Deleted social networks with IDs: ${idsToDelete}`);
        } catch (error) {
            console.error('❌ Error deleting social networks:', error);
            throw new Error('Error deleting social networks');
        }
    }

    async update(id_social_network, data) {
        try {
            const [updatedRows] = await  SocialBrandModel.update(data, {
                where: { id_social_network }
            });

            if (updatedRows === 0) {
                console.warn(`⚠ No social network found with ID: ${id_social_network}`);
                return null;
            }

            console.log(`✅ Updated social network with ID: ${id_social_network}`);
            return await SocialBrandModel.findByPk(id_social_network);

        } catch (error) {
            console.error('❌ Error updating social network:', error);
            throw new Error('Error updating social network');
        }
    }

}

module.exports = SocialNetworksRepository 