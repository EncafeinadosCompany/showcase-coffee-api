class ProductService {
    constructor (
        productRepository,
        brandRepository = null,

    ){
        this.productRepository = productRepository,
        this.brandRepository = brandRepository
    }

    getAll = async() =>{
        return await this.productRepository.getAll()
    }
}

module.exports = ProductService