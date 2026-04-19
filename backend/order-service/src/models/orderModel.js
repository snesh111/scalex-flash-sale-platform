import db from "../config/db.js";

export const createOrder = async (productId) => {
  await db.query(
    "INSERT INTO orders (product_id) VALUES (?)",
    [productId]
  );
};