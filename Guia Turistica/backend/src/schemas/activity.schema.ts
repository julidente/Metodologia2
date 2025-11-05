// src/schemas/activity.schema.ts
import { z } from "zod";

// Crear Activity
export const createActivitySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  price: z.number().positive("El precio debe ser un número positivo"),
  discount: z.number().min(0, "El descuento no puede ser negativo").optional(),
  //rating: z.number().min(0, "El rating mínimo es 0").max(5, "El rating máximo es 5").optional(),
  location: z.string().min(1, "La ubicación es obligatoria"),
  city_id: z.number().positive("city_id debe ser un número positivo"),
  category_id: z.number().positive("category_id debe ser un número positivo"),
});

// Actualizar Activity (todos opcionales)
export const updateActivitySchema = createActivitySchema.partial();

// Validar params con ID
export const activityIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID debe ser un número").transform(Number),
});


