import express from "express";
import { join, position } from "../controllers/queueController.js";

const router = express.Router();

router.post("/join", join);
router.get("/position/:userId", position);

export default router;