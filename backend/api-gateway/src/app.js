import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(
      "http://product-service:3000/products"
    );
    res.json(response.data);
  } catch (err) {
    console.error("Product Service Error:", err.message);
    res.status(500).json({ error: "Gateway error (product)" });
  }
});

app.post("/order", async (req, res) => {
  try {
    const response = await axios.post(
      "http://order-service:3000/order",
      req.body
    );

    res.json(response.data);
  } catch (err) {
    console.error("Order Service Error:", err.message);
    res.status(500).json({ error: "Gateway error (order)" });
  }
});
app.get("/", (req, res) => {
  res.send("API Gateway running");
});
app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});