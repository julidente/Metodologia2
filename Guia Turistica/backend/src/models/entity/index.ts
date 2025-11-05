// src/models/entity/index.ts
import { sequelize } from "../../config/database.config";
import { City } from "./city.entity";
import { Province } from "./province.entity";
import { Category } from "./category.entity";
import { Activity } from "./activity.entity";
import { Image } from "./image.entity";

// -----------------
// Asociaciones
// -----------------

// Province 1:N City
Province.hasMany(City, { foreignKey: "province_id", as: "cities" });
City.belongsTo(Province, { foreignKey: "province_id", as: "province" });

// City 1:N Activity
City.hasMany(Activity, { foreignKey: "city_id", as: "activities" });
Activity.belongsTo(City, { foreignKey: "city_id", as: "city" });

// Category 1:N Activity
Category.hasMany(Activity, { foreignKey: "category_id", as: "activities" });
Activity.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Activity 1:N Image
Activity.hasMany(Image, { foreignKey: "activity_id", as: "images" });

export { sequelize, City, Category, Province, Activity, Image };
