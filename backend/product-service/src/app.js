import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import pool from "./config/db.js";   // 🔥 IMPORT DB

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

// 🔥 AUTO INIT DATA
const initData = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");

    if (rows.length === 0) {
      await pool.query(
        "INSERT INTO products (name, stock, price) VALUES ('iPhone', 5, 1000)"
      );
      console.log("✅ Default product added");
    }
  } catch (err) {
    console.error("❌ DB Init Error:", err.message);
  }
};

initData();

app.listen(3000, () => {
  console.log("Product Service running on port 3000");
});