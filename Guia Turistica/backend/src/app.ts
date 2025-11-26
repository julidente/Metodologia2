// src/app.ts

import express from 'express';
import path from 'path';
import cors from 'cors';
import cityRoutes from './routes/city.routes';
import provinceRoutes from './routes/province.routes';
import categoryRoutes from './routes/category.routes';
import activitiesRoutes from './routes/activity.routes';
import userRoutes from './routes/user.routes';
import imagesRoutes from './routes/image.routes';
import authRoutes from './routes/auth.routes';

import { setupSwagger } from '../src/config/swagger'; // IMPORTANTE para usar swagger
//import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes estáticas desde public/images
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Swagger UI
setupSwagger(app);

//app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/provinces', provinceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imagesRoutes);

// Middleware de manejo de errores al final
//app.use(errorMiddleware);

export default app;
