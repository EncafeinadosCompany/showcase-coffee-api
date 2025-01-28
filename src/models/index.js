const {productSchema, PRODUCTS_TABLE, ProductModel } = require('./products/products.entity')


const setupModels = (sequelize) => {
    console.log('Setting up models')
    UserModel.init(userSchema, UserModel.config(sequelize))
}

module.exports = setupModels