/**
 * @swagger
 * tags:
 *   name: Deposits
 *   description: API para gestionar depósitos
 */

/**
 * @swagger
 * /deposits:
 *   get:
 *     summary: Obtener todos los depósitos
 *     tags: [Deposits]
 *     responses:
 *       200:
 *         description: Lista de depósitos
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
 *                   amount:
 *                     type: string
 *                   type_payment:
 *                     type: string
 *                   voucher:
 *                     type: string
 *                     format: url
 *                   status:
 *                     type: boolean
 *                   id_liquidation:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al obtener los depósitos
 */

/**
 * @swagger
 * /deposits/{id}:
 *   get:
 *     summary: Obtener un depósito por su ID
 *     tags: [Deposits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del depósito
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
 *                 amount:
 *                   type: string
 *                 type_payment:
 *                   type: string
 *                 voucher:
 *                   type: string
 *                   format: url
 *                 status:
 *                   type: boolean
 *                 id_liquidation:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Depósito no encontrado
 *       500:
 *         description: Error al obtener el depósito
 */

/**
 * @swagger
 * /deposits:
 *   post:
 *     summary: Crear un nuevo depósito
 *     tags: [Deposits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               amount:
 *                 type: string
 *               type_payment:
 *                 type: string
 *               voucher:
 *                 type: string
 *                 format: url
 *               status:
 *                 type: boolean
 *               id_liquidation:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Depósito creado exitosamente
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
 *                 amount:
 *                   type: string
 *                 type_payment:
 *                   type: string
 *                 voucher:
 *                   type: string
 *                   format: url
 *                 status:
 *                   type: boolean
 *                 id_liquidation:
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
 * /deposits/liquidation/{liquidationId}:
 *   get:
 *     summary: Obtener depósitos por ID de liquidación
 *     tags: [Deposits]
 *     parameters:
 *       - in: path
 *         name: liquidationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de depósitos relacionados con la liquidación
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
 *                   amount:
 *                     type: string
 *                   type_payment:
 *                     type: string
 *                   voucher:
 *                     type: string
 *                     format: url
 *                   status:
 *                     type: boolean
 *                   id_liquidation:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al obtener los depósitos
 */
