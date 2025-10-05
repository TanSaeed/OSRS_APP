// backend/src/models/User.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class User extends Model {}
User.init({
  username: { type: DataTypes.STRING(12), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(60), allowNull: false },
  user_role: { type: DataTypes.ENUM("member","leader","admin"), defaultValue: "member" },
  clan_id: { type: DataTypes.INTEGER, allowNull: true },
}, { sequelize, modelName: "users" });
