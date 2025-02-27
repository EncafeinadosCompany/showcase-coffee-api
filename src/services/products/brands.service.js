class BrandService {

    constructor(BrandRepository, SocialNetworksRepository) {

        this.brandRepository = BrandRepository
        this.socialNetworksRepository = SocialNetworksRepository
    }

    async getAll() {
        return await this.brandRepository.getAll()
    }

    async getById(id) {
        return await this.brandRepository.getById(id);
    }


    async getAllSocialNetworks() {
        return await this.socialNetworksRepository.getAllNetworks();
    }

    async createBrand(data) {
        const brand = await this.brandRepository.create(data);

        if(data.social_networks){
            data.social_networks.map(async (network) => {
                await this.socialNetworksRepository.createSocialNetworks({
                    id_brand: brand.id,
                    id_social_network: network.id_social_network,
                    description: network.description,
                    url: network.url
                });
            });
        }
        return brand;
    };

    async updateBrand(id, data) {
        try {
            await this.brandRepository.update(id, data);
    
            const existingNetworks = await this.socialNetworksRepository.getByBrandId(id);
            const existingIds = new Set(existingNetworks.map(n => n.id_social_network));
    
            if (!data.social_networks || data.social_networks.length === 0) {
                if (existingIds.size > 0) {
                    await this.socialNetworksRepository.deleteAllByBrandId(id);
                }
            } else {

                const newIds = new Set(data.social_networks.map(n => n.id_social_network));
                const idsToDelete = [...existingIds].filter(id => !newIds.has(id));
    
                if (idsToDelete.length > 0) {
                    await this.socialNetworksRepository.deleteByIds(id, idsToDelete);
                }
    
                await Promise.all(
                    data.social_networks.map(async (network) => {
                        if (existingIds.has(network.id_social_network)) {
                            await this.socialNetworksRepository.update(network.id_social_network, {
                                description: network.description,
                                url: network.url
                            });
                        } else {
                            await this.socialNetworksRepository.createSocialNetworks({
                                id_brand: id,
                                id_social_network: network.id_social_network,
                                description: network.description,
                                url: network.url || ""
                            });
                        }
                    })
                );
            }
    
            return await this.brandRepository.getById(id);
    
        } catch (error) {
            console.error('🚨 ERROR EN updateBrand:', error.message);
            throw new Error('SERVICE: ' + error.message);
        }
    }
    

}

module.exports = BrandService