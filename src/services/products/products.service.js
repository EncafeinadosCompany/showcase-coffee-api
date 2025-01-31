
const ProductRepository = require('../../repositories/products/products.repository')
class ProductService {
    
    constructor (){

    this.productRepository = new ProductRepository()
    }

    async getAll () {
        return await this.productRepository.getAll()
    }

    async getById (id){
        return await this.productRepository.getById(id);
    }

    async create (product){
        return await this.productRepository.create(product);
    }
}

module.exports = ProductService