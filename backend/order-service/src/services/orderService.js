import axios from "axios";
import { createOrder } from "../models/orderModel.js";

export const placeOrder = async (productId) => {
  try {
    // 🔹 Step 1: Call product-service to reduce stock
    const response = await axios.post(
      "http://product-service:3000/products/buy",
      { productId } // ⚠️ Make sure this matches product-service
    );

    // 🔹 Step 2: Create order in DB
    await createOrder(productId);

    // 🔹 Step 3: Success response
    return {
      success: true,
      message: "Order successful",
    };

  } catch (err) {
    // 🔥 LOG FULL ERROR (VERY IMPORTANT)
    console.error("🔥 ORDER ERROR FULL:", err.response?.data || err.message);

    // 🔹 Handle business errors (like out of stock)
    if (err.response && err.response.status === 400) {
      return {
        success: false,
        error: err.response.data.error || "Out of stock",
      };
    }

    // 🔹 Handle unknown errors
    return {
      success: false,
      error: "Internal order error",
    };
  }
};