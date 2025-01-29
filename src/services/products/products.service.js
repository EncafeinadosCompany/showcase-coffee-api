class ProductService {
    constructor (
        productRepository,

    ){
        this.productRepository = productRepository
    }

    getAll = async() =>{
        return await this.productRepository.getAll()
    }
}

module.exports = ProductService