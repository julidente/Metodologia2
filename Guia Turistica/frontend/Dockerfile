# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dev dependencies para build
RUN npm ci

# Copiar código TS y compilar a JS
COPY . .
RUN npm run build

# Etapa 2: imagen ligera de producción
FROM node:18-alpine

WORKDIR /app

# Instalar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar build final compilado
COPY --from=builder /app/dist ./dist

# Exponer puerto de producción
EXPOSE 3001

ENV NODE_ENV=production

# Ejecutar app compilada
CMD ["npm", "start"]

# En producción, npm start debe ejecutar el JS compilado dentro de /dist. Por ejemplo: "start": "node dist/index.js" en tu package.json.

#Resumen: tu Dockerfile de producción ya es correcto, solo asegurate que:
#npm run build realmente genera dist/index.js (o el entry point compilado).
#npm start ejecuta ese archivo.