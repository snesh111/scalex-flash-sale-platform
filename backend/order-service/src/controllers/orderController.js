import { placeOrder } from "../services/orderService.js";

export const order = async (req, res) => {
  try {
    const result = await placeOrder(req.body.productId);
    res.json(result);
  } catch (err) {
  console.error("FULL ERROR:", err.response?.data); // 🔥 ADD THIS
  res.status(500).json({ error: "Gateway error (order)" });
}
};