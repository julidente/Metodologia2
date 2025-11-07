import { Router } from "express";
import ActivityController from "../controllers/activity.controller";
import { validate } from "../middlewares/validate.middleware";
import { createActivitySchema, updateActivitySchema } from "../schemas/activity.schema";
import { idParamSchema } from "../schemas/common.schema";

const router = Router();

router.get("/", (req, res) => ActivityController.getAll(req, res));

// Nueva ruta con sorting
router.get("/sorted", (req, res) => ActivityController.getAllSorted(req, res));
/* 
sin el secuencial

GET /activities/sorted?sort=priceAsc
GET /activities/sorted?sort=discountDesc
GET /activities/sorted?sort=name 
*/

// con el secuencial
/* /activities/sorted?sort=city → Ordena por ciudad

/activities/sorted?sort=city,name → Ordena primero por ciudad, y dentro de cada ciudad por nombre de actividad

/activities/sorted?sort=discountDesc,priceAsc → Ordena primero por descuento descendente y, si hay empate, por precio ascendente */

router.get("/:id", validate(idParamSchema, "params"), (req, res) => ActivityController.getById(req, res));
router.post("/", validate(createActivitySchema), (req, res) => ActivityController.create(req, res));
router.put("/:id", validate(idParamSchema, "params"), validate(updateActivitySchema), (req, res) => ActivityController.update(req, res));
router.delete("/:id", validate(idParamSchema, "params"), (req, res) => ActivityController.delete(req, res));

export default router;

