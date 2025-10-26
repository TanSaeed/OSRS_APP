import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db.js";

export type UserRole = "member" | "leader" | "admin";

export interface UserAttributes {
  id: number;
  username: string;
  passwordHash: string;
  userRole: UserRole;
  clanId: number | null;
  createdAt: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "clanId" | "createdAt"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare username: string;
  declare passwordHash: string;
  declare userRole: UserRole;
  declare clanId: number | null;
  declare createdAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: "password_hash",
    },
    userRole: {
      type: DataTypes.ENUM("member", "leader", "admin"),
      allowNull: false,
      defaultValue: "member",
      field: "user_role",
    },
    clanId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      field: "clan_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
