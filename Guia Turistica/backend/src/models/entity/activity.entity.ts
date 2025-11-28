// src/models/entity/activity.entity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';
// para los strategy necesito asociaciones con city y category, requiero las entidades
import { City } from './city.entity';
import { Category } from './category.entity';

export class Activity extends Model {
  public activity_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public discount!: number;
  public location!: string;
  public category_id!: number;
  public city_id!: number;

  // -------------------
  // Asociaciones
  // -------------------
  public city?: City; // opcional porque puede no venir
  public category?: Category; // opcional
}

Activity.init(
  {
    activity_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    discount: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    location: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    city_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: 'Activities', timestamps: true },
);
