const ShoppingRepositories = require('../../repositories/shoppings/shoppings.repositories');
const ShoppingVariantRepositories = require('../../repositories/shoppings/shoppingVariant.repositories');
const ProductsRepository = require('../../repositories/products/products.repository');
const sequelize = require('../../models');

class ShoppingService {
    constructor() {
        this.shoppingRepositories = new ShoppingRepositories(),
            this.shoppingVariantRepositories = new ShoppingVariantRepositories(),
            this.productsRepositories = new ProductsRepository()
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
    
      async createShoppingDetail(shoppingDetailData) {
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
    
          // const subtotal = shoppingDetailData.quantity * shoppingDetailData.shopping_prices;
          // // Se actualiza / incrementa el valor total de la compra
          // shopping.total += subtotal;
          await shopping.save({ transaction });
    
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