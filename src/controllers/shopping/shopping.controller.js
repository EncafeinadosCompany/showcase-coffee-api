const express = require('express');
const ShoppingService = require('../../services/shoppings/shopping.service');

class ShoppingController {
  constructor() {
    this.shoppingService = new ShoppingService();
  }

  async getAllShopping(req, res) {
    try {
      const shopping = await this.shoppingService.getAllShopping();
      res.status(200).json(shopping);
    } catch (error) {
      console.error('CONTROLLER: Error fetching all shopping:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getShoppingById(req, res) {
    try {
      const { id } = req.params;
      const shopping = await this.shoppingService.getShoppingById(id);
      if (!shopping) {
        return res.status(404).json({ message: `Shopping with id ${id} not found` });
      }
      res.status(200).json(shopping);
    } catch (error) {
      console.error(`Error fetching shopping with id:`, error);
      res.status(500).json({ message: error.message });
    }
  }

  async createShopping(req, res) {
    try {
      const shoppingData = req.body;
      const newShopping = await this.shoppingService.createShoppingWithDetails(shoppingData.shopping, shoppingData.details);
      res.status(201).json(newShopping);
    } catch (error) {
      console.error('Error creating new shopping:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async createDetail(req, res) {
    try {
      const shoppingDetailData = req.body;
      const newShoppingDetail = await this.shoppingService.createShoppingVariant(shoppingDetailData);
      res.status(201).json(newShoppingDetail);
    } catch (error) {
      console.error('Error creating new shopping detail:', error);
      if (error.message.includes('No se encontró la compra')) {
        return res.status(404).json({ message: error.message });
      } else if (error.message.includes('Ya existe un detalle de compra con este producto')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async getAllShoppingVariant(req, res) {
    try {
      const shoppingVariant = await this.shoppingService.getAllShoppingVariant();
      res.status(200).json(shoppingVariant);
    } catch (error) {
      console.error('CONTROLLER: Error fetching all shopping:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getShoppingVariantById(req, res) {
    try {
      const { id } = req.params;
      const shopping = await this.shoppingService.getShoppingVariantById(id);
      if (!shopping) {
        return res.status(404).json({ message: `CONTROLLER:Shopping with id ${id} not found` });
      }
      res.status(200).json(shopping);
    } catch (error) {
      console.error(`Error fetching shopping with id ${id}:`, error);
      res.status(500).json({ message: error.message });
    }
  }


  

}

module.exports = ShoppingController;
