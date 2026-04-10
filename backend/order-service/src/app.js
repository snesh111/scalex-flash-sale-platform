import express from "express";
import cors from "cors";   // 🔥 ADD THIS
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());           // 🔥 ADD THIS (IMPORTANT)
app.use(express.json());

app.use("/order", orderRoutes);

app.listen(3000, () => {
  console.log("Order Service running on port 3000");
});