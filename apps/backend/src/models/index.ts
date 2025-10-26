import { Clan } from "./clan.model.js";
import { Loadout } from "./loadout.model.js";
import { Loot } from "./loot.model.js";
import { User } from "./user.model.js";

let associationsInitialized = false;

export const initModels = () => {
  if (associationsInitialized) {
    return;
  }

  Clan.hasMany(User, {
    as: "members",
    foreignKey: "clanId",
  });

  Clan.belongsTo(User, {
    as: "leader",
    foreignKey: "leaderId",
  });

  User.belongsTo(Clan, {
    as: "clan",
    foreignKey: "clanId",
  });

  User.hasOne(Loadout, {
    as: "loadout",
    foreignKey: "userId",
  });

  Loadout.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  Loot.belongsTo(User, {
    as: "addedByUser",
    foreignKey: "addedBy",
  });

  User.hasMany(Loot, {
    as: "lootEntries",
    foreignKey: "addedBy",
  });

  Loot.belongsTo(Clan, {
    as: "clan",
    foreignKey: "clanId",
  });

  Clan.hasMany(Loot, {
    as: "lootEntries",
    foreignKey: "clanId",
  });

  associationsInitialized = true;
};

export { Clan, Loadout, Loot, User };
