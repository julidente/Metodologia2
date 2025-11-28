# Guia turistica con Docker, Node.js, PostgreSQL y React

### 🎯 Arquitectura General
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx     │    │   React     │    │   Express   │
│  (Proxy)    │◄──►│ (Frontend)  │◄──►│  (Backend)  │
│   :80       │    │   :5137     │    │   :3001     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                   ┌─────────────┐    ┌─────────────┐
                   │    Redis    │    │ PostgreSQL  │
                   │  (Cache)    │    │    (DB)     │
                   │   :6379     │    │   :5432     │
                   └─────────────┘    └─────────────┘
```

### 🔧 Servicios del Sistema

| Servicio | Tecnología | Puerto | Función |
|----------|------------|--------|---------|
| **Frontend** | Vite | 5137 | Interfaz de usuario |
| **Backend** | Express + Sequelize | 3001 | API REST |
| **Database** | PostgreSQL 15 | 5432 | Base de datos principal |
| **Cache** | Redis 7 | 6379 | Cache y sesiones |
| **Proxy** | Nginx | 80 | Reverse proxy |
| **pgAdmin** | pgAdmin 4 | 5050 | Administración de BD |

Para ver las rutas con swagger: http://localhost:3001/api-docs/

---

## 🗂️ Entidades del Proyecto

---

### 🔹 User
- **user_id**: number (PK)  
- **name**: string  
- **email**: string  
- **password_hash**: string (bcrypt hash para contraseñas)  

> Solo disponible para el admin

---

### 🔹 Province
- **province_id**: number (PK)  
- **name**: string  

**Relaciones:**  
- Contiene muchas **City** (1:N)

---

### 🔹 City
- **city_id**: number (PK)  
- **name**: string  
- **province_id**: number (FK)  

**Relaciones:**  
- Pertenece a una **Province** (N:1)  
- Ofrece muchas **Activity** (1:N)

---

### 🔹 Category
- **category_id**: number (PK)  
- **name**: string  
- **description**: string  

**Relaciones:**  
- Clasifica muchas **Activity** (1:N)

---

### 🔹 Activity
- **activity_id**: number (PK)  
- **name**: string  
- **description**: string  
- **price**: number  
- **discount**: number  
- **location**: string  
- **category_id**: number (FK)  
- **city_id**: number (FK)  

**Relaciones:**  
- Pertenece a una **City** (N:1)  
- Pertenece a una **Category** (N:1)  
- Tiene muchas **Image** (1:N)

---

### 🔹 Image
- **image_id**: number (PK)  
- **url**: string  
- **activity_id**: number (FK)  

**Relaciones:**  
- Pertenece a una **Activity** (N:1)


## Diagrama UML

![Diagrama UML](./backend//images/Diagra%20UML%20Guia%20Turistica.jpg)

## Guia de instalacion

### 1. Agregar un .env al mismo nivel que este readme (al nivel del .yml)

Se pasara las .env al mail

### 2. Agregar un .env.test dentro de la carpeta backend

Se pasara las .env.test al mail

### 3. Agregar un .env en la carpeta de frontend

Se pasara las .env al mail

### 4. Levantar los Contenedores con Docker

Entrar en la carpeta con el .yml:
```bash
cd '.\Guia Turistica\'
```
Primero, construir y levantar los contenedores:

```bash
docker-compose build
docker-compose up -d
```

Agregamos las dependencias en el backend:
vamos al backend con cd  y luego:
```bash
npm install
```

Agregamos las dependencias en el frontend:
vamos al frontend con cd  y luego:
```bash
npm install
```

para ver si el backend funciona correctamente hacemos un log:
```bash
docker-compose logs backend
```

para ver si el frontend funciona correctamente hacemos un log:
```bash
docker-compose logs frontend
```

### 5. Preparar las bases de datos 
Luego, ingresar al contenedor del backend para ejecutar las migraciones y los seeders:

```bash
docker-compose exec backend sh

# Dentro del contenedor:
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
exit
```

### 6. Revisar contenido de la base de datos
Si uno quiere ingresar para ver las tablas de la base de datos:
```bash
docker exec -it guia_db psql -U postgres -d guia_turistica

# Dentro de la bd:
#mostrar tablas
\dt  

#para ver contenido
select * from "nombre de la tabla"; 

#para salir
\q 
```

## Dependencias

## 📦 Dependencias del Backend

- **axios**: Cliente HTTP para realizar peticiones a servicios externos.  
- **bcrypt**: Encripta contraseñas de forma segura para el registro y login.  
- **cors**: Permite que el frontend se comunique con el backend desde otro dominio (Cross-Origin Resource Sharing).  
- **jsonwebtoken**: Implementa autenticación mediante tokens JWT.  
- **swagger-jsdoc**: Genera la documentación de la API a partir del código.  
- **swagger-ui-express**: Expone la documentación Swagger en una ruta del backend.  
- **zod**: Valida datos de entrada mediante esquemas tipados.  
- **sequelize**: ORM que facilita la interacción con PostgreSQL usando modelos en JavaScript/TypeScript.  

## 🛠️ Dependencias de Desarrollo

- **husky**: Ejecuta hooks de Git como pre-commit y pre-push para asegurar calidad.  
- **eslint**: Linter que detecta errores y aplica buenas prácticas en el código.  
- **prettier**: Formateador automático que mantiene un estilo de código consistente.  
- **typescript**: Lenguaje de tipado estático que mejora la robustez del backend.  
- **jest**: Framework para realizar pruebas unitarias y de integración.

## Patrones utilizados:

### Builder Pattern
Aplicación: Creación de actividades turísticas

Este patrón es ideal para la creación de objetos complejos paso a paso, como las actividades turísticas, que pueden tener múltiples propiedades opcionales (descripción, imágenes, precio, descuentos, etc.). 

Permite construir instancias de manera flexible y clara, evitando constructores con demasiados parámetros.

### Singleton Pattern
Aplicación: Conexión a la base de datos PostgreSQL

Se utilizará este patrón para garantizar que exista una única instancia de la conexión a la base de datos durante toda la ejecución del servidor. 
Esto mejora el rendimiento, evita múltiples conexiones innecesarias y asegura consistencia en las operaciones de acceso a datos.

### Strategy Pattern

Aplicación: Ordenamiento flexible de actividades

El sistema permitirá a los usuarios ordenar actividades según diferentes criterios:
- Categoria (A - Z)
- Ciudad (A - Z)
- Provincia (A - Z)
- Nombre Actividad (A - Z)
- Descuentos Asc / Desc
- Precio Asc / Desc

El strategy es solo un criterio por vez, NO permite multiples criterios sequenciales

## Estructura de Carpetas (falta frontend)

```bash
Metodologia2/
└── Guia Turistica/
    ├── docker-compose.yml
    ├── .env
    ├── .env.example
    ├── README.md
    │
    ├── backend/                 # Backend (Node + TS)
    │   ├── .husky/
    │   │   ├── pre-commit
    │   │   └── pre-push
    │   │
    │   ├── config/
    │   │   └── config.js
    │   │
    │   ├── images/
    │   │   └── Diagrama UML Guia Turistica.jpg
    │   │
    │   ├── migrations/
    │   │   ├── 20251031134600-create-province.js
    │   │   ├── 20251031134600-create-city.js
    │   │   ├── 20251031160253-create_category.js
    │   │   ├── 20251031160307-create_activity.js
    │   │   ├── 20251103011809-create_user.js
    │   │   └── 20251103014850-create-image.js
    │   │
    │   ├── seeders/
    │   │   ├── 20251031134804-provinces.js
    │   │   ├── 20251031140030-cities.js
    │   │   ├── 20251031160435-category.js
    │   │   ├── 20251101041011-activity.js
    │   │   ├── 20251103012300-user.js
    │   │   └── 20251103020855-image.js
    │   │
    │   ├── src/
    │   │   ├── config/
    │   │   │   ├── cloudinary.ts
    │   │   │   ├── database.config.ts
    │   │   │   ├── env.config.ts
    │   │   │   ├── jwt.config.ts
    │   │   │   ├── swagger.ts
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── controllers/
    │   │   │   ├── activity.controller.ts
    │   │   │   ├── auth.controller.ts
    │   │   │   ├── category.controller.ts
    │   │   │   ├── city.controller.ts
    │   │   │   ├── image.controller.ts
    │   │   │   ├── province.controller.ts
    │   │   │   ├── uploadDinary.controller.ts
    │   │   │   └── user.controller.ts
    │   │   │
    │   │   ├── dtos/
    │   │   │   ├── activity.dto.ts
    │   │   │   ├── multeRequesDto.ts
    │   │   │   └── user.dto.ts
    │   │   │
    │   │   ├── middlewares/
    │   │   │   ├── auth.middleware.ts
    │   │   │   ├── errorHandler.ts
    │   │   │   └── validate.middleware.ts
    │   │   │
    │   │   ├── models/
    │   │   │   ├── activity.model.ts
    │   │   │   ├── category.model.ts
    │   │   │   ├── city.model.ts
    │   │   │   ├── image.model.ts
    │   │   │   ├── province.model.ts
    │   │   │   ├── user.model.ts
    │   │   │   │
    │   │   │   └── entity/      # Entidades dentro de models/
    │   │   │       ├── activity.entity.ts
    │   │   │       ├── category.entity.ts
    │   │   │       ├── city.entity.ts
    │   │   │       ├── image.entity.ts
    │   │   │       ├── province.entity.ts
    │   │   │       └── user.entity.ts
    │   │   │
    │   │   ├── patterns/   # Implementación de patrones de diseño
    │   │   │   ├── builder/
    │   │   │   │   └── activity.builder.ts
    │   │   │   ├── singleton/
    │   │   │   │   └── database.connection.ts
    │   │   │   └── strategy/
    │   │   │       ├── activitySorter.context.ts
    │   │   │       ├── indexStrategy.ts
    │   │   │       ├── sortByCategory.strategy.ts
    │   │   │       ├── sortByCity.strategy.ts
    │   │   │       ├── sortByDiscountAsc.strategy.ts
    │   │   │       ├── sortByDiscountDesc.strategy.ts
    │   │   │       ├── sortByName.strategy.ts
    │   │   │       ├── sortByPriceAsc.strategy.ts
    │   │   │       ├── sortByPriceDesc.strategy.ts
    │   │   │       ├── sortByProvince.strategy.ts
    │   │   │       └── strategy.mapper.ts
    │   │   │
    │   │   ├── repositories/
    │   │   │   ├── activity.repository.ts
    │   │   │   ├── category.repository.ts
    │   │   │   ├── city.repository.ts
    │   │   │   ├── image.repository.ts
    │   │   │   ├── province.repository.ts
    │   │   │   └── user.repository.ts
    │   │   │
    │   │   ├── routes/
    │   │   │   ├── activity.routes.ts
    │   │   │   ├── auth.routes.ts
    │   │   │   ├── category.routes.ts
    │   │   │   ├── city.routes.ts
    │   │   │   ├── image.routes.ts
    │   │   │   ├── province.routes.ts
    │   │   │   └── user.routes.ts
    │   │   │
    │   │   ├── schemas/    # validaciones Zod
    │   │   │   ├── activity.schema.ts
    │   │   │   ├── auth.schema.ts
    │   │   │   ├── category.schema.ts
    │   │   │   ├── city.schema.ts
    │   │   │   ├── common.schema.ts
    │   │   │   ├── image.schema.ts
    │   │   │   ├── province.schema.ts
    │   │   │   └── user.schema.ts
    │   │   │
    │   │   ├── services/
    │   │   │   ├── activity.service.ts
    │   │   │   ├── auth.service.ts
    │   │   │   ├── category.service.ts
    │   │   │   ├── city.service.ts
    │   │   │   ├── image.service.ts
    │   │   │   ├── province.service.ts
    │   │   │   ├── subscription.service.ts
    │   │   │   └── user.service.ts
    │   │   │
    │   │   ├── tests/
    │   │   │   ├── integration/
    │   │   │   └── unit/
    │   │   │       ├── activity.test.ts
    │   │   │       ├── auth.test.ts
    │   │   │       └── user.test.ts
    │   │   │
    │   │   ├── types/
    │   │   │   ├── jsonwebtoken.d.ts
    │   │   │   └── swagger-jsdoc.d.ts
    │   │   │
    │   │   ├── utils/
    │   │   │   ├── hashPassword.ts
    │   │   │   ├── parseId.ts
    │   │   │   ├── app.ts
    │   │   │   ├── index.ts
    │   │   │   └── test-app.ts
    │   │   │
    │   │   └── uploads/
    │   │
    │   ├── .env.test
    │   ├── Dockerfile
    │   ├── Dockerfile.dev
    │   ├── eslint.config.ts
    │   ├── jest.config.cjs
    │   ├── jest.setup.ts
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── tsconfig.test.json
    │
    ├── .env
    ├── .gitignore
    ├── docker-compose.yml
    ├── Guia Turistica-Readme.md
    │
    ├── frontend/                # Frontend (React)
    │   ├── Dockerfile.dev
    │   ├── package.json
    │   └── src/
    │
    ├── database/
    │   └── init.sql
    │
    ├── nginx/
    │   └── nginx.conf
    │
    └── pgadmin/
        ├── servers.json
        ├── servers-with-password-json
        ├── Dockerfile
        └── pgpass
```



