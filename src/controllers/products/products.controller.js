const express = require ('express')

const ProductService = require('../../services/products/products.service')


class ProductController {

    constructor() {
        
        this.productService = new ProductService();
    }

    async getAll (req , res) {
        try {
            const variants = await this.productService.getAll()
            res.status(200).json(variants)

        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing product ID in request" });
        }
    
        try {
            console.log(`Fetching product with id: ${id}`);
    
            const product = await this.productService.getById(id);
    
            if (!product) {
                return res.status(404).json({ message: `Product with id ${id} not found` });
            }
            res.status(200).json(product);
    
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            res.status(500).json({ message: error.message });
        }
      }

    create = async ( req , res) =>{

        const productData = req.body;

        if (!productData.attributes || productData.attributes.length === 0) {
            return res.status(400).json({ message: "Product data and attributes are required" });
        }
        try {
            const product = await this.productService.create(productData, productData.attributes);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = ProductController;