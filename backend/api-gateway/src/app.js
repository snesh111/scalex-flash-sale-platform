import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ PRODUCTS (this is fine)
app.use("/products", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://product-service:3000${req.originalUrl}`,
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Product Service Error:", err.message);
    res.status(500).json({ error: "Gateway error (product)" });
  }
});

// 🔥 FIXED ORDER ROUTE (IMPORTANT CHANGE)
app.post("/order", async (req, res) => {
  try {
    const response = await axios.post(
      "http://order-service:3000/order", // ✅ clean direct call
      req.body
    );

    res.json(response.data);
  } catch (err) {
    console.error("Order Service Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Gateway error (order)" });
  }
});

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("🚀 API Gateway is running");
});

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});