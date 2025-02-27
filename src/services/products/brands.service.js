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

    async updateBrand(id ,data) {

        try {      
            if (!id) {
                throw new Error("ID de marca no proporcionado");
            }

         await this.brandRepository.update(id, data);

        if(Array.isArray(data.social_networks) && data.social_networks.length > 0){

            console.log('DATA', data.social_networks)

           
            // firts delete all networks
            await this.socialNetworksRepository.delete(id);
            // then create the new ones

            await Promise.all(
                data.social_networks.map((network) =>
                    this.socialNetworksRepository.createSocialNetworks({
                        id_brand: id,
                        id_social_network: network.id_social_network,
                        description: network.description,
                        url: network.url
                    })
                )
            );

        }
        return await this.brandRepository.getById(id);
        }catch(error){
            console.log ('SERVICE', error.message)
            throw new Error('SERVICE: ' + error.message);
        }


        // if(data.social_networks){
        //     data.social_networks.map(async (network) => {
        //         await this.socialNetworksRepository.update({
        //             id_brand: brand.id,
        //             id_social_network: network.id_social_network,
        //             description: network.description,
        //             url: network.url
        //         });
        //     });
        // }
        
    }

}

module.exports = BrandService