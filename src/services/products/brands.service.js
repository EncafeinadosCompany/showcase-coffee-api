class BrandService {
    
    constructor (BrandRepository){

    this.brandRepository = BrandRepository
    }

    async getAll () {
        return await this.brandRepository.getAll()
    }

    async getById (id){
        return await this.brandRepository.getById(id);
    }

    async create (brands){
        return await this.brandRepository.create(brands);
    }
}

module.exports = BrandService