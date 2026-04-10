import express from "express";
import { buy, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/buy", buy);
router.get("/", getProducts);

export default router;