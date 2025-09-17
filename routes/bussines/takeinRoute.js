import express from "express";
import takeinController from "../../controllers/businessControllers/takeinController.js";
const router = express.Router();

// 新增打卡
router.post("/addTakein", takeinController.addTakein);

export default router;
