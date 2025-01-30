const VariantRepository = require('../../repositories/products/variant.repository')

class VariantService {

    constructor (){
       this.variantRepository = VariantRepository;
    }
    async getAll (){
        return await this.variantRepository.getAll();
    } 

    async getById (id){
        return await this.variantRepository.getById(id);
    }

    async create (variant){
        return await this.variantRepository.create(variant);
    }

}
module.exports = VariantService