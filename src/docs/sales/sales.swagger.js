/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API to manage sales
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   total:
 *                     type: number
 *                   status:
 *                     type: boolean
 */

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 total:
 *                   type: number
 *                 status:
 *                   type: boolean
 *       404:
 *         description: Sale not found
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sale:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   total:
 *                     type: number
 *                   status:
 *                     type: boolean
 *                     default: true
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_sales:
 *                       type: integer
 *                     id_variant_products:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     subtotal:
 *                       type: number
 *                     status:
 *                       type: boolean
 *                       default: true
 *     responses:
 *       201:
 *         description: Sale successfully created
 *       400:
 *         description: Invalid Data
 */

/**
 * @swagger
 * /sales/variant/all:
 *   get:
 *     summary: Get all sale variants
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of sale variants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_variant_products:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   subtotal:
 *                     type: number
 *                   status:
 *                     type: boolean
 */

/**
 * @swagger
 * /sales/variant/{id}:
 *   get:
 *     summary: Get a sale variant by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale variant information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_variant_products:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *                 subtotal:
 *                   type: number
 *                 status:
 *                   type: boolean
 *       404:
 *         description: Sale variant not found
 */
