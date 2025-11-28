// src/models/entity/category.entity.ts
// sin asociaciones, se hacen en index.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database.config';

export class Category extends Model {
  public category_id!: number;
  public name!: string;
  public description!: string;
}

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'Categories',
    timestamps: true,
  },
);
