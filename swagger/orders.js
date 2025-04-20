/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders with optional filters
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: status_id
 *         schema:
 *           type: integer
 *         description: Filter by status ID
 *       - in: query
 *         name: courier_id
 *         schema:
 *           type: integer
 *         description: Filter by courier ID
 *       - in: query
 *         name: store_id
 *         schema:
 *           type: integer
 *         description: Filter by store ID
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by orders created after this date
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by orders created before this date
 *     responses:
 *       200:
 *         description: List of filtered orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status for the order
 *                 example: "Delivered"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order or status not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/{id}/courier:
 *   put:
 *     summary: Change the courier for an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courier_id:
 *                 type: integer
 *                 description: ID of the new courier
 *                 example: 5
 *     responses:
 *       200:
 *         description: Courier changed successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/upload-order-excel:
 *   post:
 *     summary: Upload orders via Excel file
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               orders:
 *                 type: string
 *                 format: binary
 *                 description: Excel file containing orders
 *     responses:
 *       201:
 *         description: Orders uploaded successfully
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token to access these endpoints.
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the order.
 *           example: 1
 *         city:
 *           type: string
 *           description: City of the order.
 *           example: "New York"
 *         customer:
 *           type: string
 *           description: Customer name.
 *           example: "John Doe"
 *         mobile:
 *           type: string
 *           description: Customer's mobile number.
 *           example: "+123456789"
 *         address:
 *           type: string
 *           description: Delivery address.
 *           example: "123 Main St"
 *         comment:
 *           type: string
 *           description: Additional comments for the order.
 *           example: "Leave at the front door"
 *         order_price:
 *           type: number
 *           format: float
 *           description: Price of the order.
 *           example: 100.50
 *         delivery_price:
 *           type: number
 *           format: float
 *           description: Delivery price.
 *           example: 10.00
 *         sum:
 *           type: number
 *           format: float
 *           description: Total price (order + delivery).
 *           example: 110.50
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order was created.
 *           example: "2025-04-17T12:00:00Z"
 *         courier_id:
 *           type: integer
 *           description: ID of the courier assigned to the order.
 *           example: 5
 *         store_id:
 *           type: integer
 *           description: ID of the store that created the order.
 *           example: 3
 *         status_id:
 *           type: integer
 *           description: ID of the status of the order.
 *           example: 2
 */

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */
