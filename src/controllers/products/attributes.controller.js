const express = require('express');
const AttributeService = require('../../services/products/attributes.service');

class AttributeController {
    constructor (){
        this.attributeService = new AttributeService();
    }

    async getAllAttributes(req, res){
        try {
            const attributes = await this.attributeService.getAll();
            res.status(200).json(attributes);
        } catch (error) {
            console.error('CONTROLLER: Error fetching all attributes:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async getAttributesID(req, res){
        try {
            const {id} = req.params;
            const attributes = await this.attributeService.getAttributesID(id);
            if (!attributes) {
                return res.status(404).json({ message: `Attribute with id ${id} not found` });
            }
            res.status(200).json(attributes);
        } catch (error) {
            console.error(`Error fetching attribute with id:`, error);
            res.status(500).json({ message: error.message });
        }
    }

    async createAttribute(req, res){
        try {
            const attributeData = req.body;
            console.log(attributeData);
            const newAttribute = await this.attributeService.createAttribute(attributeData);
            res.status(201).json(newAttribute);
        } catch (error) {
            console.error('Error creating new attribute:', error);
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = AttributeController;