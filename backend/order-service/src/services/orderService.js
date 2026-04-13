import axios from "axios";
import { createOrder } from "../models/orderModel.js";

export const placeOrder = async (productId) => {
  try {
    console.log("Calling product service...");

    await axios.post("http://product-service:3000/products/buy", {
      productId,
    });

    console.log("Product service success");
    return { message: "Order successful" };

  } catch (err) {
    console.error("FINAL ERROR:", err.response?.data || err.message);
    throw err;
  }
};