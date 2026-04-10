import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Route to product-service
app.use("/products", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://product-service:3000/products${req.url}`,
      data: req.body,
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Gateway error (product)" });
  }
});

// 👉 Route to order-service
app.use("/order", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://order-service:3000/order${req.url}`,
      data: req.body,
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Gateway error (order)" });
  }
});

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});