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

    async updateTotal(id, data, options = {}) {
        try {
            await SalesModel.update(
                { total: data.total },
                { where: { id }, ...options }
            );

            const updatedSale = await SalesModel.findByPk(id, {
                include: ['sales_variant'],
                ...options
            });

            return updatedSale;

        } catch (error) {
            console.error('Error updating total:', error);
            throw error;
        }
    };

}

module.exports = SaleRepository