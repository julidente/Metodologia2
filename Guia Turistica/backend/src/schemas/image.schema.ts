// src/schemas/image.schema.ts
import { z } from 'zod';

export const createImageSchema = z.object({
  url: z.string().min(1, 'La URL es obligatoria'),
  activity_id: z.number().positive('activity_id debe ser un número positivo'),
});

export const updateImageSchema = createImageSchema.partial(); // todos opcionales
