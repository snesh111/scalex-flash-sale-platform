import express from "express";
import queueRoutes from "./routes/queueRoutes.js";

const app = express();
app.use(express.json());

app.use("/queue", queueRoutes);

app.listen(3000, () => {
  console.log("Queue Service running on port 3000");
});