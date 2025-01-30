const express = require('express')

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);

    router
        .use('/users', require('./users/user.routes'))
        .use('/roles', require('./users/role.routes'))
        .use('/employees', require('./users/employee.routes'))

        .use('/products', require('./products/products.routes'))
        .use('/variants', require('./products/variants.routes'))
        .use('/brands', require('./products/brands.routes'))
        .use('/store', require('./stores/stores.routes'))
        .use('/shopping', require('./shopping/shopping.routes'))
        .use('/provider', require('./providers/providers.routes'))

}

module.exports = routerApi;