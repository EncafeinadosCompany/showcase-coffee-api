class BrandService {
    
    constructor (BrandRepository, SocialNetworksRepository){

    this.brandRepository = BrandRepository
    this.socialNetworksRepository = SocialNetworksRepository
    }

    async getAll () {
        return await this.brandRepository.getAll()
    }

    async getById (id){
        return await this.brandRepository.getById(id);
    }

    async create (brands){
        let errorNetworks = 0;
        let correctNetworks = 0;
        
        if(brands.networks && Array.isArray(brands.networks)){

            const brand = await this.brandRepository.create(brands);

            await Promise.all(brands.networks.map(async (network) => {
                
                const socialNetwork = await this.socialNetworksRepository.getNetworkById(network.id_social_network);

                if(socialNetwork){
                    await this.socialNetworksRepository.createSocialNetworks({
                        id_brand: brand.id,
                        id_social_network: socialNetwork.id,
                        description: network.description,
                        url: network.url
                    });
                    correctNetworks++;
                }else{
                    errorNetworks++;
                }
               
            }))
           
           
        }
       
        console.log('servicios',brands.networks,Array.isArray(brands.networks))
        return {
            brands,
            message: `se crearon ${correctNetworks} redes sociales y ${errorNetworks} no se pudieron crear`
        };
    }
}

module.exports = BrandService