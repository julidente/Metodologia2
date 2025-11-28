// src/index.ts
import 'dotenv/config';
import app from './app';
import { Database } from './config/database.config';
import { sequelize, City, Province, Category, Activity, Image } from './models/entity';

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    console.log('🧩 Conectando a la base de datos...');
    await Database.connect(); // Inicializa la conexión

    const sequelize = Database.getInstance(); // Obtiene la instancia de Sequelize

    // 🔹 Sincronizar todas las entidades con la DB
    //await sequelize.sync({ alter: true });
    //console.log("✅ Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
})();
