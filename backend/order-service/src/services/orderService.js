import axios from "axios";
import { createOrder } from "../models/orderModel.js";

export const placeOrder = async (productId) => {
  try {
    // call product-service
    await axios.post("http://product-service:3000/products/buy", {
      productId,
    });

    // save order
    await createOrder(productId);

    return { message: "Order successful" };

  } catch (err) {
    throw new Error(err.response?.data?.error || "Order failed");
  }
};