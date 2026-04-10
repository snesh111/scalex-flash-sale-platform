import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "root",
  database: "flash",
});

export default pool;