// src/routes/category.routes.ts
import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Operaciones relacionadas con categorías de productos
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
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
 *                     example: Electrónica
 *                   description:
 *                     type: string
 *                     example: Productos tecnológicos y dispositivos electrónicos
 */
router.get('/', (req, res) => CategoryController.getAll(req, res));
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Ropa
 *                 description:
 *                   type: string
 *                   example: Artículos de vestimenta y moda
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  CategoryController.getById(req, res),
);
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hogar
 *               description:
 *                 type: string
 *                 example: Artículos para el hogar y decoración
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 name:
 *                   type: string
 *                   example: Hogar
 *                 description:
 *                   type: string
 *                   example: Artículos para el hogar y decoración
 *       400:
 *         description: Error en los datos de entrada
 */
router.post('/', validate(createCategorySchema), (req, res) => CategoryController.create(req, res));
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tecnología
 *               description:
 *                 type: string
 *                 example: Dispositivos electrónicos, computadoras y accesorios
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:id', validate(idParamSchema, 'params'), validate(updateCategorySchema), (req, res) =>
  CategoryController.update(req, res),
);
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       204:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:id', validate(idParamSchema, 'params'), (req, res) =>
  CategoryController.delete(req, res),
);

export default router;
