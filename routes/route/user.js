import express from "express";
import userController from "../../controllers/userController.js";

const router = express.Router();

// 新增用户
router.post("/addUser", userController.addUser);

export default router;
