import app from "./app.js";
import { sequelize } from "./db.js";

async function main() {
  try {
    await sequelize.sync();
    app.listen(3000);
    console.log("Conexión establecida correctamente", 3000);
  } catch (error) {
    console.log("Error de conexion", error);
  }
}

main();
