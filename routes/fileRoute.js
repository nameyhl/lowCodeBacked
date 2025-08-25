import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import fileController from "../controllers/fileController.js";
import upload from "../configs/fileUplod.js";

const router = express.Router();
router.use(authMiddleware);

// 上传文件
router.post("/upload", upload.single("file"), fileController.uploadFile);
// 下载文件
router.get("/download", upload.single("file"), fileController.downloadFile);
// 获取文件流
router.get(
  "/stream/:filename",
  upload.single("file"),
  fileController.getFileSteam
);
// 删除文件
export default router;
