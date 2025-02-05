/**
 * @swagger
 * tags:
 *   name: Variant Products
 *   description: API to manage product variants
 */

/**
 * @swagger
 * /variants:
 *   post:
 *     summary: Creates a new product variant.
 *     description: Creates a new product variant with grammage, stock, and associated product.
 *     tags: [Variant Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grammage:
 *                 type: string
 *                 example: "500g"
 *               stock:
 *                 type: integer
 *                 example: 100
 *               id_product:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Created a new product variant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 grammage:
 *                   type: string
 *                   example: "500g"
 *                 stock:
 *                   type: integer
 *                   example: 100
 *                 id_product:
 *                   type: integer
 *                   example: 1
 */

/**
 * @swagger
 * /variants:
 *   get:
 *     summary: Lists all product variants.
 *     description: Retrieves a list of all product variants.
 *     tags: [Variant Products]
 *     responses:
 *       200:
 *         description: A list of product variants.
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
 *                   grammage:
 *                     type: string
 *                     example: "500g"
 *                   stock:
 *                     type: integer
 *                     example: 100
 *                   id_product:
 *                     type: integer
 *                     example: 1
 */

/**
 * @swagger
 * /variants/{id}:
 *   get:
 *     summary: Get a product variant by ID.
 *     description: Retrieves a specific product variant by its ID.
 *     tags: [Variant Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product variant ID.
 *     responses:
 *       200:
 *         description: A single product variant object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 grammage:
 *                   type: string
 *                   example: "500g"
 *                 stock:
 *                   type: integer
 *                   example: 100
 *                 id_product:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Product variant not found.
 */
