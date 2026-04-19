const { Pool } = require("pg");

const pool = new Pool({
  user: "developer",
  password: "developer123",
  host: "localhost",
  port: 5432,
  database: "app_productividad"
});

pool.on("error", (err) => {
  console.error("Error en pool de conexión:", err);
});

module.exports = pool;
