import express from "express";
import cors from "cors";
import { hello } from "@osrs-app/shared";
import { sequelize } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// sequelize.authenticate();

async function startServer() {
  try {
    // Test DB first
    await sequelize.authenticate();
    console.log("✅ Database is connected");

    // Only start server if DB is ready
    app.listen(4000, () => {
      console.log("🚀 Server is running on http://localhost:4000");
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1); // exit the process so you know it's broken
  }
}


app.get( "/", (req, res ) => {
    res.send(`Backend API is running - ${hello()}`);
});

/*
app.listen(4000, () => {
    console.log("Server is currnetly running on localhost 4000");
});
*/

startServer();