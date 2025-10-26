import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db.js";

export interface LootAttributes {
  lootId: number;
  quantity: number;
  addedBy: number | null;
  clanId: number | null;
}

export type LootCreationAttributes = Optional<
  LootAttributes,
  "lootId" | "addedBy" | "clanId"
>;

export class Loot
  extends Model<LootAttributes, LootCreationAttributes>
  implements LootAttributes
{
  declare lootId: number;
  declare quantity: number;
  declare addedBy: number | null;
  declare clanId: number | null;
}

Loot.init(
  {
    lootId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "loot_id",
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    addedBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      field: "added_by",
    },
    clanId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      field: "clan_id",
    },
  },
  {
    sequelize,
    tableName: "loot",
    timestamps: false,
  }
);
