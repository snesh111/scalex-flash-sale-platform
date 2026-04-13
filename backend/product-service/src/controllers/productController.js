import { buyProduct } from "../models/productModel.js";
import pool from "../config/db.js";

export const buy = async (req, res) => {
  try {
    const result = await buyProduct(req.body.productId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products");
  res.json(rows);
};