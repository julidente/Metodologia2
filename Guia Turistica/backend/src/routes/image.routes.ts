// src/routes/image.routes.ts
// con url de la imagen en BD

import { Router } from 'express';
import ImageController from '../controllers/image.controller';
import { validate } from '../middlewares/validate.middleware';
import { createImageSchema, updateImageSchema } from '../schemas/image.schema';
import { idParamSchema } from '../schemas/common.schema';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Imágenes
 *   description: Operaciones relacionadas con las imágenes de actividades
 */

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Obtiene todas las imágenes
 *     tags: [Imágenes]
 *     responses:
 *       200:
 *         description: Lista de imágenes almacenadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   image_id:
 *                     type: integer
 *                     example: 1
 *                   url:
 *                     type: string
 *                     example: https://example.com/uploads/imagen1.jpg
 *                   activity_id:
 *                     type: integer
 *                     example: 5
 */
router.get('/', (req, res) => ImageController.getAll(req, res));

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     summary: Obtiene una imagen por ID
 *     tags: [Imágenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_id:
 *                   type: integer
 *                   example: 3
 *                 url:
 *                   type: string
 *                   example: https://example.com/uploads/rafting.jpg
 *                 activity_id:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Imagen no encontrada
 */
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  ImageController.getById(req, res),
);

/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Crea una nueva imagen asociada a una actividad (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - activity_id
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/uploads/trekking.jpg
 *               activity_id:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Imagen creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image_id:
 *                   type: integer
 *                   example: 12
 *                 url:
 *                   type: string
 *                   example: https://example.com/uploads/trekking.jpg
 *                 activity_id:
 *                   type: integer
 *                   example: 4
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 */
router.post('/', authenticateJWT, validate(createImageSchema), (req, res) =>
  ImageController.create(req, res),
);

/**
 * @swagger
 * /api/images/{id}:
 *   put:
 *     summary: Actualiza una imagen existente (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la imagen a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/uploads/nueva-foto.jpg
 *               activity_id:
 *                 type: integer
 *                 example: 6
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Imagen no encontrada
 */
router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(updateImageSchema),
  (req, res) => ImageController.update(req, res),
);

/**
 * @swagger
 * /api/images/{id}:
 *   delete:
 *     summary: Elimina una imagen (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la imagen a eliminar
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Imagen eliminada correctamente
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Imagen no encontrada
 */
router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  ImageController.delete(req, res),
);

export default router;

// con dinaryconfig
// src/routes/image.routes.ts
/* import { Router } from 'express';
import multer from 'multer';
import ImageController from '../controllers/image.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal

router.post('/', upload.single('image'), (req, res) => ImageController.create(req, res));

export default router; */
