class ShoppingService {
  constructor(ShoppingRepository, ShoppingVariantRepositories, productVariantsRepository, employeeRepository, allianceService, sequelize) {
    this.shoppingRepositories = ShoppingRepository,
      this.shoppingVariantRepositories = ShoppingVariantRepositories,
      this.productsVariantRepository = productVariantsRepository,
      this.employeeRepository = employeeRepository,
      this.allianceService = allianceService,
      this.sequelize = sequelize
  }

  async getAllShopping() {
    try {
      const shopping = await this.shoppingRepositories.getAll();
      return shopping;
    } catch (error) {
      console.error('SERVICE: Error in service layer while fetching all shopping:', error);
      throw error;
    }
  }

  async getShoppingById(id) {
    try {
      const shopping = await this.shoppingRepositories.getById(id);
      return shopping;
    } catch (error) {
      console.error(`SERVICE: Error in service layer while fetching shopping with id ${id}:`, error);
      throw error;
    }
  }

  async getShoppingVariantsByShoppingId(id) {
    try {
      const shoppingVariants = await this.shoppingVariantRepositories.getVariantByShoppingId(id);
      return shoppingVariants;
    } catch (error) {
      console.error("Error en el servicio:", error);
      throw error;
    }
  }

  async createShoppingWithDetails(shoppingData, detailsData) {
    const transaction = await this.sequelize.transaction();
    try {
      const newShopping = await this.shoppingRepositories.create(shoppingData, { transaction });

      await Promise.all(detailsData.map(async (detail) => {
        detail.id_shopping = newShopping.id;

        await this.shoppingVariantRepositories.create(detail, { transaction });

        const productVariant = await this.productsVariantRepository.getById(detail.id_variant_products, { transaction });
        if (!productVariant) throw new Error('SERVICE: Variant product not found.');

        const newStock = productVariant.stock + detail.quantity;
        await this.productsVariantRepository.updateStock(productVariant.id, newStock, { transaction });
      }));

      await transaction.commit();

      const employee = await this.employeeRepository.getEmployeeById(newShopping.id_employee);
      if (!employee) throw new Error('SERVICE: Employee not found.');

      const alliance = this.allianceService.addAlliance(newShopping.id_store, employee.id_provider);
      

      return newShopping;
    } catch (error) {
      await transaction.rollback();
      throw new Error('SERVICE: ' + error.message);
    }
  }

  async getAllShoppingVariant() {
    try {
      const shoppingVariant = await this.shoppingVariantRepositories.getAll();
      return shoppingVariant;
    } catch (error) {
      throw new Error('SERVICE:' + error.message);
    }
  };

  async getShoppingVariantById(id) {
    try {
      const shoppingVariant = await this.shoppingVariantRepositories.getById(id);
      return shoppingVariant;
    } catch (error) {
      throw new Error('SERVICE:' + error.message);
    }
  }
}

module.exports = ShoppingService