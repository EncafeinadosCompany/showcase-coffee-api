/**
 * @swagger
 * tags:
 *   name:  Providers
 *   description: API to manage providers
 */

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Creates a new provider.
 *     description: Creates a new provider.
 *     responses:
 *       201:
 *         description: Creates a new provider.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *            properties:
 *             name:
 *              type: string
 *             nit:
 *              type: string
  *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */