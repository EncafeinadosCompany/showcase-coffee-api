const VariantRepository = require('../../repositories/products/variant.repository')

class VariantService {

    constructor (){
       this.variantRepository = new VariantRepository();
    }
    async getAll (){
        return await this.variantRepository.getAll();
    } 

    async getById (id){
        return await this.variantRepository.getById(id);
    }

    async create(variantData) {
        if (!variantData.images || variantData.images.length === 0) {
          throw new Error("At least one image is required");
        }
        return await this.variantRepository.create(variantData);
      }
}
module.exports = VariantService