import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";

// 路由中间件
router.use(authMiddleware);

// 引入各个分组路由
import routes from "./managerRoute/routes.js";
import user from "./managerRoute/user.js";
import frim from "./managerRoute/frim.js";
import department from "./managerRoute/department.js";
import position from "./managerRoute/position.js";

// 使用路由
router.use("/routes", routes);
router.use("/user", user);
router.use("/frim", frim);
router.use("/department", department);
router.use("/position", position);

// 到处路由
export default router;
