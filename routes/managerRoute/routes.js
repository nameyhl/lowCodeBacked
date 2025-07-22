import express from "express";
const router = express.Router();
import routesController from "../../controllers/routesController.js";

// 获取所有路由
router.get("/getRoutes", routesController.getRoutes);
// 新增路由
router.post("/addRoute", routesController.addRoute);
// 批量删除路由
router.post("/deleteRoutes", routesController.deleteRoutes);
// 修改路由
router.post("/updateRoute", routesController.updateRoute);
// 查询路由
router.post("/searchRoutes", routesController.searchRoutes);
// 

export default router;
