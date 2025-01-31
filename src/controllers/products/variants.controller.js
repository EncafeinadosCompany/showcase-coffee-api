const express = require("express");
const VariantService = require("../../services/products/variants.service");

class VariantController {
  constructor() {
    this.variantService = new VariantService();
  }

  async getAll(req, res) {
    try {
      const variants = await this.variantService.getAll();
      res.status(200).json(variants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const variant = await this.variantService.getById(id);

      if (!variant) {
        return res
          .status(404)
          .json({ message: `Variant product with id ${id} not found` });
      }
      res.status(200).json(variant);
    } catch (error) {
      console.error(`Error fetching variant with id ${id}:`, error);
      res.status(500).json({ message: error.message });
    }
  }
  async create(req, res) {
    try {
      const variantData = req.body;
      const newVariant = await this.variantService.create(variantData);
      res.status(201).json(newVariant);
    } catch (error) {
      console.error("Error creating new variant:", error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = VariantController;
