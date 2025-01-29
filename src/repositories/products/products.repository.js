

const {ProductModel} = require('../../models/products/products.entity')
const {BrandModel} = require('../../models/brands/brands.entity')
console.log(Product)

class ProductsRepository {

    constructor() {}
    async getAll() {

    const products = await ProductModel.findAll()
    return products
    }

    async getById(id) {
        const product = await ProductModel.findByPk(id , {
            include: [{
                model:BrandModel,
                as: 'brands'
            }]
        })
        return !product ? null : product    
    }

    async create(product){
        const newProduct = await ProductModel.create(product)
        return newProduct
    }
}