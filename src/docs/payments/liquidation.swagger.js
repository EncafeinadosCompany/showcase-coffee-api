/**
 * @swagger
 * tags:
 *   name: Liquidations
 *   description: API para gestionar liquidaciones
 */

/**
 * @swagger
 * /liquidations:
 *   get:
 *     summary: Obtener todas las liquidaciones
 *     tags: [Liquidations]
 *     responses:
 *       200:
 *         description: Lista de liquidaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   current_debt:
 *                     type: string
 *                   status:
 *                     type: boolean
 *                   id_shopping:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al obtener las liquidaciones
 */

/**
 * @swagger
 * /liquidations/{id}:
 *   get:
 *     summary: Obtener una liquidación por su ID
 *     tags: [Liquidations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información de la liquidación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 current_debt:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 id_shopping:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Liquidación no encontrada
 *       500:
 *         description: Error al obtener la liquidación
 */

/**
 * @swagger
 * /liquidations:
 *   post:
 *     summary: Crear una nueva liquidación
 *     tags: [Liquidations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               current_debt:
 *                 type: string
 *               status:
 *                 type: boolean
 *               id_shopping:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Liquidación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 current_debt:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 id_shopping:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /liquidations/{id}/deposits:
 *   get:
 *     summary: Obtener una liquidación con sus depósitos relacionados
 *     tags: [Liquidations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información de la liquidación con depósitos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 current_debt:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 id_shopping:
 *                   type: integer
 *                 deposits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       amount:
 *                         type: string
 *                       type_payment:
 *                         type: string
 *                       voucher:
 *                         type: string
 *                         format: url
 *                       status:
 *                         type: boolean
 *       404:
 *         description: Liquidación no encontrada
 *       500:
 *         description: Error al obtener la liquidación con depósitos
 */
