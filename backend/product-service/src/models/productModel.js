import pool from "../config/db.js";

export const buyProduct = async (productId) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [rows] = await conn.query(
      "SELECT stock FROM products WHERE id = ? FOR UPDATE",
      [productId]
    );

    if (rows.length === 0) {
      throw new Error("Product not found");
    }

    if (rows[0].stock <= 0) {
      throw new Error("Out of stock");
    }

    await conn.query(
      "UPDATE products SET stock = stock - 1 WHERE id = ?",
      [productId]
    );

    await conn.commit();

    return { message: "Stock updated" };

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};