// src/routes/category.routes.ts
import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema } from "../schemas/category.schema";
import { idParamSchema } from "../schemas/common.schema"; 

const router = Router();

router.get("/", (req, res) => CategoryController.getAll(req, res));
router.get("/:id", validate(idParamSchema, "params"), (req, res) => CategoryController.getById(req, res));
router.post("/", validate(createCategorySchema), (req, res) => CategoryController.create(req, res));
router.put("/:id", validate(idParamSchema, "params"), validate(updateCategorySchema), (req, res) => CategoryController.update(req, res));
router.delete("/:id", validate(idParamSchema, "params"), (req, res) => CategoryController.delete(req, res));

export default router;

