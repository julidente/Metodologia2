// src/routes/image.routes.ts
// con url de la imagen en BD

/* import { Router } from "express";
import ImageController from "../controllers/image.controller";
import { validate } from "../middlewares/validate.middleware";
import { createImageSchema, updateImageSchema } from "../schemas/image.schema";
import { idParamSchema } from "../schemas/common.schema";

const router = Router();

router.get("/", (req, res) => ImageController.getAll(req, res));
router.get("/:id", validate(idParamSchema, "params"), (req, res) => ImageController.getById(req, res));
router.post("/", validate(createImageSchema), (req, res) => ImageController.create(req, res));
router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateImageSchema),
  (req, res) => ImageController.update(req, res)
);
router.delete("/:id", validate(idParamSchema, "params"), (req, res) => ImageController.delete(req, res));

export default router; */

// con dinaryconfig
// src/routes/image.routes.ts
import { Router } from 'express';
import multer from 'multer';
import ImageController from '../controllers/image.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal

router.post('/', upload.single('image'), (req, res) => ImageController.create(req, res));

export default router;
