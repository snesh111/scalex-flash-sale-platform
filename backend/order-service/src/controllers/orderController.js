import { placeOrder } from "../services/orderService.js";

export const order = async (req, res) => {
  try {
    const result = await placeOrder(req.body.productId);

    res.status(200).json(result || {
      message: "Order successful",
      success: true,
    });

  } catch (err) {
    console.error("FULL ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Gateway error (order)",
    });
  }
};