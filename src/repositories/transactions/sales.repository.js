const { SalesModel } = require('../../models/transactions/sales.entity');

class SaleRepository {
    constructor() { }

    async getAll() {
        const sales = await SalesModel.findAll(
            {
                include: ['sales_variant']
            }
        );
        return sales
    }
    async getById(id) {
        const sales = await SalesModel.findByPk(id,
            {
                include: ['sales_variant']
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