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
    return await this.variantRepository.create(variantData);
  }
}
module.exports = VariantService