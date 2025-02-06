/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: API to manage employees
 */

/**
 * @swagger
 * /users/employees:
 *   get:
 *     summary: Lists all employees.
 *     description: Retrieves a list of all employees.
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees.
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
 *                   id_role:
 *                     type: integer
 *                     example: 1
 *                   identification:
 *                     type: string
 *                     example: "100001"
 *                   name:
 *                     type: string
 *                     example: "Jader"
 *                   last_name:
 *                     type: string
 *                     example: "Rojas"
 *                   phone:
 *                     type: string
 *                     example: "1234567"
 *                   email:
 *                     type: string
 *                     example: "adminstortienda@gmail.com"
 *                   type:
 *                     type: string
 *                     example: "store"
 *                   id_store:
 *                     type: integer
 *                     example: 1
 */

/**
 * @swagger
 * /users/employees/{id}:
 *   get:
 *     summary: Get an employee by ID.
 *     description: Retrieves a specific employee by its ID.
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID.
 *     responses:
 *       200:
 *         description: A single employee object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 id_role:
 *                   type: integer
 *                   example: 1
 *                 identification:
 *                   type: string
 *                   example: "100001"
 *                 name:
 *                   type: string
 *                   example: "Jader"
 *                 last_name:
 *                   type: string
 *                   example: "Rojas"
 *                 phone:
 *                   type: string
 *                   example: "1234567"
 *                 email:
 *                   type: string
 *                   example: "adminstortienda@gmail.com"
 *                 type:
 *                   type: string
 *                   example: "store"
 *                 id_store:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Employee not found.
 */

/**
 * @swagger
 * /users/employees:
 *   post:
 *     summary: Creates a new employee.
 *     description: Creates a new employee with role ID, identification, name, last name, phone, email, type, and store ID.
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_role:
 *                 type: integer
 *                 example: 1
 *               identification:
 *                 type: string
 *                 example: "100001"
 *               name:
 *                 type: string
 *                 example: "Jader"
 *               last_name:
 *                 type: string
 *                 example: "Rojas"
 *               phone:
 *                 type: string
 *                 example: "1234567"
 *               email:
 *                 type: string
 *                 example: "adminstortienda@gmail.com"
 *               type:
 *                 type: string
 *                 example: "store"
 *               id_store:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Created a new employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 id_role:
 *                   type: integer
 *                   example: 1
 *                 identification:
 *                   type: string
 *                   example: "100001"
 *                 name:
 *                   type: string
 *                   example: "Jader"
 *                 last_name:
 *                   type: string
 *                   example: "Rojas"
 *                 phone:
 *                   type: string
 *                   example: "1234567"
 *                 email:
 *                   type: string
 *                   example: "adminstortienda@gmail.com"
 *                 type:
 *                   type: string
 *                   example: "store"
 *                 id_store:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid data.
 */
