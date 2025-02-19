const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swaggerConfig');

const routerApi = (app) => {

    const router = express.Router();

    app.use('/api/v1', router);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    router
        .use('/auth', require('./users/auth.routes'))
        
        // Users
        .use('/users/users', require('./users/user.routes'))
        .use('/users/roles', require('./users/role.routes'))
        .use('/users/employees', require('./users/employee.routes'))

        // Companies
        .use('/companies/stores', require('./companies/stores.routes'))
        .use('/companies/providers', require('./companies/providers.routes'))
        .use('/companies/alliances', require('./companies/alliances.routes'))

        // Products
        .use('/products/products', require('./products/products.routes'))
        .use('/products/attributes', require('./products/attributes.routes'))
        .use('/products/variants', require('./products/variants.routes'))
        .use('/products/brands', require('./products/brands.routes'))

        // Imagenes
        .use('/products/images', require('./products/images.routes'))
        
        // Transactions
        .use('/transactions/shopping', require('./transactions/shopping.routes'))
        .use('/transactions/sales', require('./transactions/sales.routes'))

        // Payments
        .use('/payments/liquidation', require('./payments/liquidation.routes'))
        .use('/payments/deposit', require('./payments/deposit.routes'))

        // Dashboard
        .use('/dashboard', require('./dashboard/dashboard.routes'))

}

module.exports = routerApi;