const ShoppingRepositories = require('../../repositories/shoppings/shoppings.repository');
const ShoppingVariantRepositories = require('../../repositories/shoppings/shoppingVariant.repository');
const ProductVariantsRepository = require('../../repositories/products/products.repository');
const sequelize = require('../../models');

class ShoppingService {
  constructor() {
    this.shoppingRepositories = new ShoppingRepositories(),
      this.shoppingVariantRepositories = new ShoppingVariantRepositories(),
      this.productsRepositories = new ProductVariantsRepository()
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

  async createShoppingWithDetails(shoppingData, detailsData) {
    const transaction = await sequelize.transaction();
    try {
      // Crear la compra
      const newShopping = await this.shoppingRepositories.create(shoppingData, { transaction });

      // Crear los detalles de compra
      await Promise.all(detailsData.map(async (detail) => {
        detail.id_shopping = newShopping.id; // Corregido aquí

        await this.shoppingVariantRepositories.create(detail, { transaction });
      }));

      await transaction.commit();
      return newShopping;
    } catch (error) {
      await transaction.rollback();
      throw new Error('SERVICE: ' + error.message);
    }
  }



  async createShoppingVariant(shoppingDetailData) {
    const transaction = await sequelize.transaction();
    try {
      const shopping = await this.shoppingRepositories.getById(shoppingDetailData.id_shopping, { transaction });
      if (!shopping) throw new Error('SERVICE: No se encontró la compra.');

      const existingDetail = await this.shoppingVariantRepositories.findByShoppingAndProduct(
        shoppingDetailData.id_shopping,
        shoppingDetailData.id_variant_products,
        { transaction }
      );

      if (existingDetail) {
        throw new Error('Ya existe un detalle de compra con este producto');
      }

      const newShoppingDetail = await this.shoppingVariantRepositories.create(shoppingDetailData, { transaction });

      // Actualizar el stock del producto variante
      const productVariant = await this.productsRepositories.findById(shoppingDetailData.id_variant_products, { transaction });
      if (!productVariant) throw new Error('SERVICE: No se encontró el producto variante.');

      const newStock = productVariant.stock + shoppingDetailData.quantity;
      await this.productsRepositories.updateStock(productVariant.id, newStock, { transaction });

      await transaction.commit();
      return newShoppingDetail;
    } catch (error) {
      await transaction.rollback();
      throw new Error('SERVICE:' + error.message);
    }
  }

      async getAllShoppingVariant() {
      try {
        const shoppingVariant = await this.shoppingVariantRepositories.getAll();
        return shoppingVariant;
      } catch (error) {
        console.error('SERVICE: Error in service layer while fetching all shopping variants:', error);
        throw error;
      }
    }

    async getShoppingVariantById(id) {
      try {
        const shoppingVariant = await this.shoppingVariantRepositories.getById(id);
        return shoppingVariant;
      } catch (error) {
        console.error(`SERVICE: Error in service layer while fetching shopping variants with id ${id}:`, error);
        throw error;
      }
    }
  }

module.exports = ShoppingService