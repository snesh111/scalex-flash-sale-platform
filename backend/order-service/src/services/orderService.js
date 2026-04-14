import axios from "axios";
import { createOrder } from "../models/orderModel.js";

export const placeOrder = async (productId) => {
  try {
    await axios.post(
      "http://product-service:3000/products/buy",
      { productId }
    );

    await createOrder(productId);

    return { success: true, message: "Order successful" };

  } catch (err) {

    // 🔥 HANDLE BUSINESS ERROR
    if (err.response && err.response.status === 400) {
      return {
        success: false,
        error: err.response.data.error || "Out of stock",
      };
    }

    console.error("ORDER ERROR:", err.message);

    return {
      success: false,
      error: "Internal order error",
    };
  }
};