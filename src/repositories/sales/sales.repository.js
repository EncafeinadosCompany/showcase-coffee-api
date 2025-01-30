
const {SalesModel} = require('../../models/sales/sales.entity');

class SaleRepository {
    constructor(){}

    async getAll(){
        return sales = await SalesModel.findAll();
    }
    async getById(id){
        return sales = await SalesModel.findByPk(id);
    }

    async create(SalesData){
        return newSale= await SalesModel.create(SalesData);
    }
}

module.exports= SaleRepository