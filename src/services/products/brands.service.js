
const BrandRepository = require('../../repositories/products/blands.repository')
class BrandService {
    
    constructor (){

    this.brandRepository = new BrandRepository()
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