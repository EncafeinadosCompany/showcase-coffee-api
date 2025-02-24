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

    const existingVariant = await this.variantRepository.existingVariant(variantData.grammage, variantData.id_product);
    if (existingVariant) {
      throw new Error('A variant with the same weight is already available for this product.');
    }

    return await this.variantRepository.create(variantData);
  }

  async updateImage(id, image_url) {
    return await this.variantRepository.updateImage(id, image_url);
  }
}
module.exports = VariantService