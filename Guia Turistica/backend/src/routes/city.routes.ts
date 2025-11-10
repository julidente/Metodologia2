// src/routes/city.routes.ts
import { Router } from 'express';
import CityController from '../controllers/city.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCitySchema, updateCitySchema } from '../schemas/city.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();

// Rutas
router.get('/', (req, res) => CityController.getAll(req, res));
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  CityController.getById(req, res),
);
router.post('/', validate(createCitySchema), (req, res) => CityController.create(req, res));
router.put('/:id', validate(idParamSchema, 'params'), validate(updateCitySchema), (req, res) =>
  CityController.update(req, res),
);
router.delete('/:id', validate(idParamSchema, 'params'), (req, res) =>
  CityController.delete(req, res),
);

export default router;
