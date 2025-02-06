/**
 * @swagger
 * tags:
 *   name: Attributes
 *   description: API to manage product attributes
 */

/**
 * @swagger
 * /products/attributes:
 *   get:
 *     summary: Get all attributes
 *     tags: [Attributes]
 *     responses:
 *       200:
 *         description: List of attributes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   description:
 *                     type: string
 */

/**
 * @swagger
 * /products/attributes/{id}:
 *   get:
 *     summary: Get an attribute by ID
 *     tags: [Attributes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attribute information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *       404:
 *         description: Attribute not found
 */

/**
 * @swagger
 * /products/attributes/:
 *   post:
 *     summary: Create a new attribute
 *     tags: [Attributes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attribute successfully created
 *       400:
 *         description: Invalid Data
 */
