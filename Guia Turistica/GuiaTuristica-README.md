comando para acceder a las bases de datos: docker exec -it guia_db psql -U postgres -d guia_turistica

### 1. Agregar un .env al mismo nivel que este readme

### 
para poner en un .env en la carpeta guia turistica (mismo nivel que este readme):
# =====================================
# BASE DE DATOS POSTGRESQL
# =====================================
POSTGRES_DB=guia_turistica
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña

# =====================================
# BACKEND
# =====================================
NODE_ENV=development
PORT=3001
JWT_SECRET=mi_jwt_secret_guia_turistica

# Config DB (se pasan al contenedor backend)
DB_HOST=db
DB_PORT=5432
DB_NAME=guia_turistica
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# CORS
CORS_ORIGIN=http://localhost:3000

# =====================================
# FRONTEND
# =====================================
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development

CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
FAST_REFRESH=true
WDS_SOCKET_HOST=localhost
WDS_SOCKET_PORT=3000
WDS_SOCKET_PATH=/ws

# =====================================
# REDIS
# =====================================
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379

# =====================================
# PGADMIN
# =====================================
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_CONFIG_SERVER_MODE=False
PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False

# ========================
# BASE DE DATOS POSTGRESQL
# ========================
POSTGRES_DB=guia_turistica
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña

# ========================
# BACKEND
# ========================
NODE_ENV=development
PORT=3001
JWT_SECRET=mi_jwt_secret_guia_turistica

# Config DB (se pasan al contenedor backend)
DB_HOST=db
DB_PORT=5432
DB_NAME=guia_turistica
DB_USER=postgres
DB_PASSWORD=tu_contraseña
# CORS
CORS_ORIGIN=http://localhost:3000

# ========================
# ADMIN (lo usara el backend)
# ========================
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH='$2a$10$IXOCTjN19Cmw1fPBwytvl.xWxFukyFrFDSoI.lUjVAdkwIyqp9DpW'
JWT_EXPIRES_IN=1h

# ========================
# FRONTEND
# ========================
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true
FAST_REFRESH=true
WDS_SOCKET_HOST=localhost
WDS_SOCKET_PORT=3000
WDS_SOCKET_PATH=/ws

# ========================
# REDIS
# ========================
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379

# ========================
# PGADMIN
# ========================
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_CONFIG_SERVER_MODE=False
PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False

### 2. Levantar los Contenedores con Docker

Primero, construir y levantar los contenedores:

```bash
docker-compose build
docker-compose up -d
```

Agregamos las dependencias en el backend:
vamos al backend con cd  y luego:
```bash
npm i
```

Luego, ingresar al contenedor del backend para ejecutar las migraciones y los seeders:

```bash
docker-compose exec backend sh

# Dentro del contenedor:
npx sequelize-cli db:migrate ( en el de la guiTuristica no es necesario se hace automaticamente las tablas)
npx sequelize-cli db:seed:all ( los seeders hay que hacerlos manualmente)
exit
```
para ver si el backend funciona correctamente hacemos un log
```bash
docker-compose logs backend
```

Si uno quiere ingresar para ver las tablas de la base de datos:
```bash
docker exec -it guia_db psql -U postgres -d guia_turistica

# Dentro de la bd:
#mostrar tablas
\dt  

 select * "nombre de la tabla"; #para ver contenido

\q #para salir
```


🧩 Beneficios de esta separación

✅ Repositorios: se encargan solo de hablar con la base de datos.
✅ Servicios: aplican reglas de negocio y validaciones.
✅ Controladores: gestionan el flujo HTTP (request/response).
✅ Fácil de testear: puedes mockear el repositorio al probar el servicio.
✅ Escalable: puedes agregar cache, logging o múltiples fuentes de datos sin romper el resto.

🧩 Cómo encaja esto en tu setup

Ya tienes:

config/config.js → usado solo por Sequelize CLI (migraciones/seeders)

src/config/env.config.ts → define y valida las variables de entorno

src/config/database.config.ts → crea la instancia de Sequelize

Entonces, el paso siguiente es usar tu env.config.ts dentro del Singleton que maneja la conexión.

🧠 Qué logras con esto

✅ Una única fuente de verdad (env.config.ts) → las variables se validan y centralizan ahí.
✅ Singleton del ORM (Database) → una sola conexión Sequelize en toda la app.
✅ Compatibilidad con CLI (config/config.js) → el CLI sigue usando las mismas .env, aunque sin validación de Zod.
✅ Preparado para producción y test → puedes hacer mock fácilmente del Database o del sequelize.