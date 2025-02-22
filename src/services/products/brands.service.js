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

}

module.exports = BrandService