import pool from "../config/db.js";

export const createOrder = async (productId) => {
  const [result] = await pool.query(
    "INSERT INTO orders (product_id) VALUES (?)",
    [productId]
  );

  return result;
};