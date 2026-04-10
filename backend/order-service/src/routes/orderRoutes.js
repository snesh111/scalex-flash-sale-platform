import express from "express";
import { order } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", order);

export default router;