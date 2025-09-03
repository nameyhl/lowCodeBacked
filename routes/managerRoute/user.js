import express from "express";
import userController from "../../controllers/managerControllers/userController.js";

const router = express.Router();

// 新增用户
router.post("/addUser", userController.addUser);
router.get("/getUser", userController.getUser);
router.post("/updateUser", userController.updateUser);
router.delete("/deleteUser", userController.deleteUser);
router.get("/getUserByDepartmentId", userController.getUserByDepartmentId);
router.get("/getAllUser", userController.getAllUser);
router.post("/login", userController.login);

export default router;
