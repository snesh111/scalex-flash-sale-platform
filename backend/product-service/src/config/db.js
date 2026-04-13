import mysql from "mysql2/promise";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

let pool;

const connectWithRetry = async () => {
  let retries = 10;   // 
  while (retries) {
    try {
      pool = mysql.createPool({
        host: "mysql",      //
        user: "root",
        password: "root",
        database: "flash",
      });

      await pool.query("SELECT 1");
      console.log("MySQL connected");
      return;
    } catch (err) {
      console.log(" Waiting for MySQL...");
      retries--;
      await sleep(3000);
    }
  }

  throw new Error("Could not connect to MySQL");
};

await connectWithRetry();

export default pool;