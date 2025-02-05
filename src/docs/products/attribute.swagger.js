// /**
//  * @swagger
//  * tags:
//  *   name: Attributes
//  *   description: API to manage attributes
//  */

// /**
//  * @swagger
//  * /attributes:
//  *   post:
//  *     summary: Creates a new attribute.
//  *     description: Creates a new attribute.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               description:
//  *                 type: string
//  *                 example: "Color"
//  *     responses:
//  *       201:
//  *         description: Attribute created successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: integer
//  *                   example: 1
//  *                 description:
//  *                   type: string
//  *                   example: "Color"
//  *                 created_at:
//  *                   type: string
//  *                   format: date-time
//  *                 updated_at:
//  *                   type: string
//  *                   format: date-time
//  */

// /**
//  * @swagger
//  * /attributes:
//  *   get:
//  *     summary: Retrieves a list of attributes.
//  *     description: Fetches all attributes available.
//  *     responses:
//  *       200:
//  *         description: A list of attributes.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: integer
//  *                     example: 1
//  *                   description:
//  *                     type: string
//  *                     example: "Color"
//  *                   created_at:
//  *                     type: string
//  *                     format: date-time
//  *                   updated_at:
//  *                     type: string
//  *                     format: date-time
//  */

// /**
//  * @swagger
//  * /attributes/{id}:
//  *   get:
//  *     summary: Retrieves a specific attribute by ID.
//  *     description: Fetches a single attribute using its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The ID of the attribute
//  *     responses:
//  *       200:
//  *         description: The requested attribute.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: integer
//  *                   example: 1
//  *                 description:
//  *                   type: string
//  *                   example: "Color"
//  *                 created_at:
//  *                   type: string
//  *                   format: date-time
//  *                 updated_at:
//  *                   type: string
//  *                   format: date-time
//  *       404:
//  *         description: Attribute not found.
//  */
