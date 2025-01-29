const express = require('express')

const productRouter = require('./products/products.routes')
const storeRouter = require('./stores/stores.routes')


const routerApi = (app) =>{

    const router = express.Router();
    app.use('/api/v1', router)

    router.use('/products', productRouter)
    router.use('/store', storeRouter)
}

module.exports = routerApi;