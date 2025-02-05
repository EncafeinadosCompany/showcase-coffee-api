/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: API to manage providers
 */

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Creates a new provider.
 *     description: Creates a new provider with name, NIT, email, phone, address, and bank accounts.
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Café Oporto"
 *               nit:
 *                 type: string
 *                 example: "1001002-1"
 *               email:
 *                 type: string
 *                 example: "Oporto@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               address:
 *                 type: string
 *                 example: "Calle 123"
 *               bankAccounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bank_account:
 *                       type: string
 *                       example: "1234567890"
 *                     type_account:
 *                       type: string
 *                       example: "Corriente"
 *                     bank:
 *                       type: string
 *                       example: "BBVA"
 *     responses:
 *       201:
 *         description: Created a new provider.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Café Oporto"
 *                 nit:
 *                   type: string
 *                   example: "1001002-1"
 *                 email:
 *                   type: string
 *                   example: "Oporto@gmail.com"
 *                 phone:
 *                   type: string
 *                   example: "123456789"
 *                 address:
 *                   type: string
 *                   example: "Calle 123"
 *                 bankAccounts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bank_account:
 *                         type: string
 *                         example: "1234567890"
 *                       type_account:
 *                         type: string
 *                         example: "Corriente"
 *                       bank:
 *                         type: string
 *                         example: "BBVA"
 */

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Lists all providers.
 *     description: Retrieves a list of all providers.
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: A list of providers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Café Oporto"
 *                   nit:
 *                     type: string
 *                     example: "1001002-1"
 *                   email:
 *                     type: string
 *                     example: "Oporto@gmail.com"
 *                   phone:
 *                     type: string
 *                     example: "123456789"
 *                   address:
 *                     type: string
 *                     example: "Calle 123"
 *                   bankAccounts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         bank_account:
 *                           type: string
 *                           example: "1234567890"
 *                         type_account:
 *                           type: string
 *                           example: "Corriente"
 *                         bank:
 *                           type: string
 *                           example: "BBVA"
 */

/**
 * @swagger
 * /providers/{id}:
 *   get:
 *     summary: Get a provider by ID.
 *     description: Retrieves a specific provider by its ID.
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The provider ID.
 *     responses:
 *       200:
 *         description: A single provider object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Café Oporto"
 *                 nit:
 *                   type: string
 *                   example: "1001002-1"
 *                 email:
 *                   type: string
 *                   example: "Oporto@gmail.com"
 *                 phone:
 *                   type: string
 *                   example: "123456789"
 *                 address:
 *                   type: string
 *                   example: "Calle 123"
 *                 bankAccounts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bank_account:
 *                         type: string
 *                         example: "1234567890"
 *                       type_account:
 *                         type: string
 *                         example: "Corriente"
 *                       bank:
 *                         type: string
 *                         example: "BBVA"
 *       404:
 *         description: Provider not found.
 */
