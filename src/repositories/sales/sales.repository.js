const { SalesModel } = require('../../models/sales/sales.entity');

class SaleRepository {
    constructor() { }

    async getAll() {
        const sales = await SalesModel.findAll(
            {
                include: ['shopping_variant']
            }
        );
        return sales
    }
    async getById(id) {
        const sales = await SalesModel.findByPk(id,
            {
                include: ['shopping_variant']
            }
        );
        return sales
    }

    async create(SalesData) {
        const newSale = await SalesModel.create(SalesData);
        return newSale
    }
}

module.exports = SaleRepository