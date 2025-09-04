import projectRoute from "./bussines/projectRoute.js";
import demandRoute from "./bussines/demandRoute.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 路由中间件
router.use(authMiddleware);
router.use("/project", projectRoute);
router.use("/demand", demandRoute);

export default router;
