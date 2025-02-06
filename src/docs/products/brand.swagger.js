/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API to manage brands
 */

/**
 * @swagger
 * /products/brands:
 *   post:
 *     summary: Creates a new brand.
 *     description: Adds a new brand to the database.
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Brand created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 */

/**
 * @swagger
 * /products/brands:
 *   get:
 *     summary: Retrieves all brands.
 *     description: Fetches all brands from the database.
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */

/**
 * @swagger
 * /products/brands/{id}:
 *   get:
 *     summary: Retrieves a brand by ID.
 *     description: Fetches a single brand from the database using its ID.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The brand ID.
 *     responses:
 *       200:
 *         description: Brand details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Brand not found.
 */
