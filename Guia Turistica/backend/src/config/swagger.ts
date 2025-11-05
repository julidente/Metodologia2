import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Guía Turística API',
      version: '1.0.0',
      description: 'Documentación de la API de la guía turística',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts'], // Ruta a tus rutas con anotaciones Swagger
};

export const swaggerSpec = swaggerJSDoc(options);
