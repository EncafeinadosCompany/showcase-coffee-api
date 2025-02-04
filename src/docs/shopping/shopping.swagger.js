/**
 * @swagger
 * tags:
 *   name: Shopping
 *   description: API to manage shopping
 */

/**
 * @swagger
 * /shopping:
 *   get:
 *     summary: Get all shopping
 *     tags: [Shopping]
 *     responses:
 *       200:
 *         description: List of shopping
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_store:
 *                     type: integer
 *                   id_employee:
 *                     type: integer
 *                   date_entry:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: boolean
 */

/**
 * @swagger
 * /shopping/{id}:
 *   get:
 *     summary: Get a shopping by ID
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shopping information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_store:
 *                   type: integer
 *                 id_employee:
 *                   type: integer
 *                 date_entry:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: boolean
 *       404:
 *         description: Shopping not found
 */

/**
 * @swagger
 * /shopping:
 *   post:
 *     summary: Create a new shopping
 *     tags: [Shopping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopping:
 *                 type: object
 *                 properties:
 *                   id_store:
 *                     type: integer
 *                   id_employee:
 *                     type: integer
 *                   date_entry:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: boolean
 *                     default: true
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_variant_products:
 *                       type: integer
 *                     roasting_date:
 *                       type: string
 *                       format: date-time
 *                     quantity:
 *                       type: integer
 *                     shopping_prices:
 *                       type: number
 *                     sale_prices:
 *                       type: number
 *                     status:
 *                       type: boolean
 *                       default: true
 *     responses:
 *       201:
 *         description: Shopping successfully created
 *       400:
 *         description: Invalid Data
 */

/**
 * @swagger
 * /shopping/variant/all:
 *   get:
 *     summary: Get all shopping variants
 *     tags: [Shopping]
 *     responses:
 *       200:
 *         description: List of shopping variants
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
 *                   roasting_date:
 *                     type: string
 *                     format: date-time
 *                   quantity:
 *                     type: integer
 *                   shopping_prices:
 *                     type: number
 *                   sale_prices:
 *                     type: number
 *                   status:
 *                     type: boolean
 */

/**
 * @swagger
 * /shopping/variant/{id}:
 *   get:
 *     summary: Get a shopping variant by ID
 *     tags: [Shopping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shopping variant information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_variant_products:
 *                   type: integer
 *                 roasting_date:
 *                   type: string
 *                   format: date-time
 *                 quantity:
 *                   type: integer
 *                 shopping_prices:
 *                   type: number
 *                 sale_prices:
 *                   type: number
 *                 status:
 *                   type: boolean
 *       404:
 *         description: Shopping variant not found
 */
