/**
 * @swagger
 * tags:
 *   name: Alliances
 *   description: API to manage the association between stores and providers
 */

/**
 * @swagger
 * /companies/alliances:
 *   post:
 *     summary: Adds a provider to a store.
 *     description: Associates a provider with a store using their IDs.
 *     tags: [Alliances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeId:
 *                 type: integer
 *                 example: 1
 *               providerId:
 *                 type: integer
 *                 example: 6
 *     responses:
 *       201:
 *         description: Provider successfully added to the store.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 storeId:
 *                   type: integer
 *                   example: 1
 *                 providerId:
 *                   type: integer
 *                   example: 6
 *       400:
 *         description: Invalid data.
 */

/**
 * @swagger
 * /companies/alliances/store/{storeId}:
 *   get:
 *     summary: Gets providers by store ID.
 *     description: Retrieves a list of providers associated with a specific store by its ID.
 *     tags: [Alliances]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The store ID.
 *     responses:
 *       200:
 *         description: A list of providers associated with the store.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 6
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
 *       404:
 *         description: Store not found.
 */

/**
 * @swagger
 * /companies/alliances/provider/{providerId}:
 *   get:
 *     summary: Gets stores by provider ID.
 *     description: Retrieves a list of stores associated with a specific provider by its ID.
 *     tags: [Alliances]
 *     parameters:
 *       - in: path
 *         name: providerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The provider ID.
 *     responses:
 *       200:
 *         description: A list of stores associated with the provider.
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
 *                     example: "Encafeinados"
 *                   email:
 *                     type: string
 *                     example: "encafeinados@gmail.com"
 *                   phone:
 *                     type: string
 *                     example: "123456789"
 *                   address:
 *                     type: string
 *                     example: "El Poblado, Medellín"
 *                   logo:
 *                     type: string
 *                     example: ""
 *       404:
 *         description: Provider not found.
 */
