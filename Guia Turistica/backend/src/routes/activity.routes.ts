import { Router } from 'express';
import ActivityController from '../controllers/activity.controller';
import { validate } from '../middlewares/validate.middleware';
import { createActivitySchema, updateActivitySchema } from '../schemas/activity.schema';
import { idParamSchema } from '../schemas/common.schema';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Actividades
 *   description: Operaciones relacionadas con las actividades turísticas
 */

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Obtiene todas las actividades
 *     tags: [Actividades]
 *     responses:
 *       200:
 *         description: Lista de actividades
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
 *                   name:
 *                     type: string
 *                     example: Paseo en bicicleta
 *                   city:
 *                     type: string
 *                     example: Mendoza
 *                   price:
 *                     type: number
 *                     example: 2500
 *                   discount:
 *                     type: number
 *                     example: 10
 */
router.get('/', (req, res) => ActivityController.getAll(req, res));

/**
 * @swagger
 * /api/activities/sorted:
 *   get:
 *     summary: Obtiene las actividades ordenadas según un criterio
 *     tags: [Actividades]
 *     parameters:
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - priceAsc
 *             - priceDesc
 *             - discountAsc
 *             - discountDesc
 *             - name
 *             - city
 *             - province
 *             - category
 *         description: >
 *           Define un único criterio de ordenamiento. Ejemplos:
 *           - `sort=priceAsc` → Ordena por precio ascendente
 *           - `sort=priceDesc` → Ordena por precio descendente
 *           - `sort=discountDesc` → Ordena por descuento descendente
 *           - `sort=name` → Ordena alfabéticamente por nombre
 *           - `sort=city` → Ordena por ciudad
 *     responses:
 *       200:
 *         description: Lista de actividades ordenadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   name:
 *                     type: string
 *                     example: Rafting en el río
 *                   city:
 *                     type: string
 *                     example: Bariloche
 *                   price:
 *                     type: number
 *                     example: 4000
 *                   discount:
 *                     type: number
 *                     example: 20
 */
// Nueva ruta con sorting
router.get('/sorted', (req, res) => ActivityController.getAllSorted(req, res));
/* 
sin el secuencial

GET /activities/sorted?sort=priceAsc
GET /activities/sorted?sort=discountDesc
GET /activities/sorted?sort=name 
*/

/**
 * @swagger
 * /api/activities/{id}:
 *   get:
 *     summary: Obtiene una actividad por ID
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: Actividad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Tour del vino
 *                 city:
 *                   type: string
 *                   example: Mendoza
 *                 price:
 *                   type: number
 *                   example: 3500
 *                 discount:
 *                   type: number
 *                   example: 15
 *       404:
 *         description: Actividad no encontrada
 */
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  ActivityController.getById(req, res),
);

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Crea una nueva actividad (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Actividades]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Caminata por la montaña
 *               city:
 *                 type: string
 *                 example: Ushuaia
 *               price:
 *                 type: number
 *                 example: 5000
 *               discount:
 *                 type: number
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: Caminata guiada por los senderos del Parque Nacional Tierra del Fuego.
 *     responses:
 *       201:
 *         description: Actividad creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 name:
 *                   type: string
 *                   example: Caminata por la montaña
 *                 city:
 *                   type: string
 *                   example: Ushuaia
 *                 price:
 *                   type: number
 *                   example: 5000
 *                 discount:
 *                   type: number
 *                   example: 5
 *                 description:
 *                   type: string
 *                   example: Caminata guiada por los senderos del Parque Nacional Tierra del Fuego.
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 */
router.post('/', authenticateJWT, validate(createActivitySchema), (req, res) =>
  ActivityController.create(req, res),
);

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Actualiza una actividad existente (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Actividades]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tour gastronómico
 *               city:
 *                 type: string
 *                 example: Salta
 *               price:
 *                 type: number
 *                 example: 4500
 *               discount:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: Degustación de comidas regionales en restaurantes típicos.
 *     responses:
 *       200:
 *         description: Actividad actualizada correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Actividad no encontrada
 */
router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(updateActivitySchema),
  (req, res) => ActivityController.update(req, res),
);

/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     summary: Elimina una actividad (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Actividades]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad
 *     responses:
 *       204:
 *         description: Actividad eliminada correctamente
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Actividad no encontrada
 */
router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  ActivityController.delete(req, res),
);

export default router;
