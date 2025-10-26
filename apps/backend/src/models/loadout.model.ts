import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db.js";

export interface LoadoutAttributes {
  id: number;
  userId: number | null;
  equipment: Record<string, unknown> | null;
}

export type LoadoutCreationAttributes = Optional<
  LoadoutAttributes,
  "id" | "userId" | "equipment"
>;

export class Loadout
  extends Model<LoadoutAttributes, LoadoutCreationAttributes>
  implements LoadoutAttributes
{
  declare id: number;
  declare userId: number | null;
  declare equipment: Record<string, unknown> | null;
}

Loadout.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: "user_id",
    },
    equipment: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "loadout",
    timestamps: false,
  }
);
