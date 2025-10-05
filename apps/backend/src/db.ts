console.log("db.ts loaded");

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // optional: hides SQL logs
  }
);

/* Test connection
sequelize.authenticate()
  .then(() => console.log("Database connected!"))
  .catch(err => console.error("DB connection error:", err));
  */
 
