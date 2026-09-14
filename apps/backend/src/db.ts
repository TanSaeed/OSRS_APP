import { Sequelize } from "sequelize";
import { databaseConfig } from "./config.js";

export const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: "mysql",
    logging: false,
  }
);
