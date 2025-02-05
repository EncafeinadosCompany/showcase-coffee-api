/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: API to manage stores
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Creates a new store.
 *     description: Creates a new store with name, email, phone, address, and logo.
 *     tags: [Stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Encafeinados"
 *               email:
 *                 type: string
 *                 example: "encafeinados@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               address:
 *                 type: string
 *                 example: "El Poblado, Medellín"
 *               logo:
 *                 type: string
 *                 example: ""
 *     responses:
 *       201:
 *         description: Created a new store.
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
 *                   example: "Encafeinados"
 *                 email:
 *                   type: string
 *                   example: "encafeinados@gmail.com"
 *                 phone:
 *                   type: string
 *                   example: "123456789"
 *                 address:
 *                   type: string
 *                   example: "El Poblado, Medellín"
 *                 logo:
 *                   type: string
 *                   example: ""
 */

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Lists all stores.
 *     description: Retrieves a list of all stores.
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: A list of stores.
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
 */

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: Get a store by ID.
 *     description: Retrieves a specific store by its ID.
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The store ID.
 *     responses:
 *       200:
 *         description: A single store object.
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
 *                   example: "Encafeinados"
 *                 email:
 *                   type: string
 *                   example: "encafeinados@gmail.com"
 *                 phone:
 *                   type: string
 *                   example: "123456789"
 *                 address:
 *                   type: string
 *                   example: "El Poblado, Medellín"
 *                 logo:
 *                   type: string
 *                   example: ""
 *       404:
 *         description: Store not found.
 */

/**
 * @swagger
 * /stores/{id}:
 *   put:
 *     summary: Updates a store by ID.
 *     description: Updates the information of a specific store by its ID.
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The store ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Encafeinados"
 *               email:
 *                 type: string
 *                 example: "encafeinados@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               address:
 *                 type: string
 *                 example: "El Poblado, Medellín"
 *               logo:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Store updated successfully.
 *       404:
 *         description: Store not found.
 */
