import { placeOrder } from "../services/orderService.js";

export const order = async (req, res) => {
  try {
    const result = await placeOrder(req.body.productId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};