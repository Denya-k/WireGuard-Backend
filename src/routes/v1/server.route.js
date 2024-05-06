const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const serverValidation = require('../../validations/server.validation');
const serverController = require('../../controllers/server.controller');
const upload = require('../../utils/multer');

const router = express.Router();

const serverUpload = upload.fields([
  { name: 'flag', maxCount: 1 },
  { name: 'file', maxCount: 1 },
]);
// noinspection JSCheckFunctionSignatures
router
  .route('/')
  .post(serverUpload, auth('manageServers'), validate(serverValidation.createServer), serverController.createServer)
  .get(auth('manageServers'), validate(serverValidation.getServers), serverController.getServers);

// noinspection JSCheckFunctionSignatures
router
  .route('/:serverId')
  .get(auth('manageServers'), validate(serverValidation.getServer), serverController.getServer)
  .patch(serverUpload, auth('manageServers'), validate(serverValidation.updateServer), serverController.updateServer)
  .delete(auth('manageServers'), validate(serverValidation.deleteServer), serverController.deleteServer);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Servers
 *   description: Server management and retrieval
 */

/**
 * @swagger
 * /servers:
 *   post:
 *     summary: Create a server
 *     description: Only admins can create servers.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               ip:
 *                 type: string
 *                 description: must be unique.
 *               flag:
 *                 type: file
 *                 description: must be an image file.
 *               file:
 *                  type: file
 *                  description: must be an *.conf file.
 *             example:
 *               name: test server
 *               ip: 1.1.1.1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Server'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all servers
 *     description: Only admins can retrieve all servers.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Server name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Server'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /servers/{id}:
 *   get:
 *     summary: Get a server
 *     description: Only admins can fetch other server.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Server id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Server'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a server
 *     description: Only admins can update servers.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Server id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ip:
 *                 type: string
 *                 description: must be unique.
 *               flag:
 *                 type: file
 *                 description: must be an image file.
 *               file:
 *                  type: file
 *                  description: must be an *.conf file.
 *             example:
 *               name: test server
 *               ip: 1.1.1.1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Server'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a server
 *     description: Only admins can delete servers.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Server id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
