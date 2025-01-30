const {LiquidationModel} = require('../../models');

class LiquidationRepository {
    
    constructor() {}

    async getLiquidations() {
        return await LiquidationModel.findAll();
    }

    async getLiquidationById(id) {
        return await LiquidationModel.findByPk(id);
    }

    async createLiquidation(liquidation) {
        const newLiquidation = await LiquidationModel.create(liquidation);
        return newLiquidation;
    }

}

module.exports = LiquidationRepository

