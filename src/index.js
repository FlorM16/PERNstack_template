import app from "./app.js";
import { sequelize } from "./db.js";

async function main() {
  try {
    await sequelize.sync();
    app.listen(3000);
    console.log("Server on port", 3000);
  } catch (error) {
    console.log("Connection error", error);
  }
}

main();
