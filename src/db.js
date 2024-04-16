import Sequelize from "sequelize";


//sequelize: Esta instancia de Sequelize se utiliza para interactuar con la base de datos
export const sequelize = new Sequelize("pern_stack", "postgres", "toor", {
  host: "localhost",
  dialect: "postgres",
});
