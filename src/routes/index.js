const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swaggerConfig');

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    router
        .use('/auth', require('./users/auth.routes'))
        
        .use('/users', require('./users/user.routes'))
        .use('/roles', require('./users/role.routes'))
        .use('/employees', require('./users/employee.routes'))

        .use('/products', require('./products/products.routes'))
        .use('/attributes', require('./products/attributes.routes'))
        .use('/variants', require('./products/variants.routes'))
        .use('/brands', require('./products/brands.routes'))
        .use('/stores', require('./stores/stores.routes'))
        .use('/shopping', require('./shopping/shopping.routes'))
        .use('/sales', require('./sales/sales.routes'))
        .use('/providers', require('./providers/providers.routes'))
        .use('/liquidation', require('./payments/liquidation.routes'))
        .use('/deposit', require('./payments/deposit.routes'))
        .use("/store-provider", require("./stores/storeProvider.routes"))

}

module.exports = routerApi;