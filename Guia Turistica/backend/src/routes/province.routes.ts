// src/routes/province.routes.ts
import { Router } from 'express';
import ProvinceController from '../controllers/province.controller';
import { validate } from '../middlewares/validate.middleware';
import { createProvinceSchema, updateProvinceSchema } from '../schemas/province.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();

router.get('/', (req, res) => ProvinceController.getAll(req, res));
router.get('/:id', validate(idParamSchema, 'params'), (req, res) => ProvinceController.getById(req, res));
router.post('/', validate(createProvinceSchema), (req, res) => ProvinceController.create(req, res));
router.put('/:id', validate(idParamSchema, 'params'), validate(updateProvinceSchema), (req, res) => ProvinceController.update(req, res));
router.delete('/:id', validate(idParamSchema, 'params'), (req, res) => ProvinceController.delete(req, res));

export default router;

