import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db.js";

export interface ClanAttributes {
  id: number;
  clanName: string | null;
  leaderId: number | null;
  estAt: Date | null;
}

export type ClanCreationAttributes = Optional<
  ClanAttributes,
  "id" | "clanName" | "leaderId" | "estAt"
>;

export class Clan
  extends Model<ClanAttributes, ClanCreationAttributes>
  implements ClanAttributes
{
  declare id: number;
  declare clanName: string | null;
  declare leaderId: number | null;
  declare estAt: Date | null;
}

Clan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    clanName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "clan_name",
    },
    leaderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      field: "leader_id",
    },
    estAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: "est_at",
    },
  },
  {
    sequelize,
    tableName: "clans",
    timestamps: false,
  }
);
