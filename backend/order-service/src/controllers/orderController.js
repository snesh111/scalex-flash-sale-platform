import { placeOrder } from "../services/orderService.js";

export const order = async (req, res) => {
  const { productId } = req.body;

  const result = await placeOrder(productId);

  if (!result.success) {
    return res.status(400).json({
      error: result.error,
    });
  }

  return res.status(200).json({
    message: result.message,
  });
};