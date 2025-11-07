import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { userInputSchema, userUpdateSchema } from '../schemas/user.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();

// Rutas de usuario (solo admin)
router.get('/', (req, res) => UserController.getAll(req, res));
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  UserController.getById(req, res),
);
router.post('/', validate(userInputSchema), (req, res) => UserController.create(req, res));
router.put('/:id', validate(idParamSchema, 'params'), validate(userUpdateSchema), (req, res) =>
  UserController.update(req, res),
);
router.delete('/:id', validate(idParamSchema, 'params'), (req, res) =>
  UserController.delete(req, res),
);

export default router;
