/**
 * @swagger
 * tags:
 *   name: Deposits
 *   description: API to manage deposits
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Deposits]
 *     responses:
 *       200:
 *         description: List deposits
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
 *                     type: timestamp
 *                  amount:
 *                    type: numeric
 *                  type_of_payment:
 *                   type: enum
 *                  values: ['CASH']
 *                 voucher:
 *                 type: character varying
 *                status:
 *                type: boolean
 *               
 * 
 */

/**
 * @swagger
 * /deposits/{id}:
 *   get:
 *     summary: Get a Deposit by ID
 *     tags: [Deposits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deposits information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *     404:
 *         description: User not found
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 */