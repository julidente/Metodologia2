import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database.config';
import { IUser } from '../user.model';

// Campos opcionales al crear un User
interface UserCreationAttributes extends Optional<IUser, 'user_id'> {}

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public user_id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
}

User.init(
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: 'Users', timestamps: true },
);
