const express = require('express')

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);

    router
        .use('/users', require('./users/user.routes'))
        .use('/roles', require('./users/role.routes'))
        .use('/employees', require('./users/employee.routes'))

        .use('/products', require('./products/products.routes'))
        .use('/store', require('./stores/stores.routes'))

}

module.exports = routerApi;