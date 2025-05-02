require("dotenv").config();
const { Pool } = require("pg");

const poolConnection = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function connectionBDPG() {
  try {
    await poolConnection.connect();
    console.log("Conexión a BD exitosa!");
  } catch (error) {
    console.error("Error al conectar:", error);
  }
}

connectionBDPG();

module.exports = poolConnection;