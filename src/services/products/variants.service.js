class VariantService {

  constructor(VariantRepository) {
    this.variantRepository = VariantRepository;
  }
  async getAll() {
    return await this.variantRepository.getAll();
  }

  async getById(id) {
    return await this.variantRepository.getById(id);
  }

  async create(variantData) {
    if (!variantData.grammage || !variantData.id_product) {
      throw new Error("grammage and id_product are required.");
    }
 
    try {

      const existingVariant = await this.variantRepository.existingVariant(variantData.grammage, variantData.id_product);
  
      if (existingVariant) throw new Error('SERVICE: A variant with the same grammage already exists for this product.')
  
      const variant = await this.variantRepository.create(variantData.grammage , variantData.id_product);

      if(!variant) throw new Error('SERVICE: Variant creation failed');

      return  variant;

    }catch(err) {
      console.log(err);
      throw new Error(`variant creation failed: ${err.message}`)
    }
   
  }

  async updateImage(id, image_url) {
    return await this.variantRepository.updateImage(id, image_url);
  }
}
module.exports = VariantService