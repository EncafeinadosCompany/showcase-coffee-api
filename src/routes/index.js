const express = require('express')

const productRouter = require('./products/products.routes')
const storeRouter = require('../routes/stores/stores.routes')


const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })

    router.use('/products', productRouter)
    router.use('/stores', storeRouter)
}

module.exports = routerApi;