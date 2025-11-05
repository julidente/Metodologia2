/* // src/entity/subscription.entity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';
import { User } from './entity/user.entity';
import { Activity } from './activity.entity';

export class Subscription extends Model {}

Subscription.init(
  {
    subscription_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscription_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'subscriptions',
    timestamps: false,
  }
);

// Relaciones
User.hasMany(Subscription, { foreignKey: 'user_id' });
Subscription.belongsTo(User, { foreignKey: 'user_id' });
 */