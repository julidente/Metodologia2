// src/models/entity/city.entity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';
import { ICity } from '../city.model';
import { Province } from './province.entity';

export class City extends Model {
  public city_id!: number;
  public name!: string;
  public province_id!: number;

  // Asociaciones
  public province?: Province; //opcional (para el strategy)
}

City.init(
  {
    city_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    province_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: 'Cities', timestamps: true },
);
