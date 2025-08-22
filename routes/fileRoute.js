import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

import upload from "../configs/fileUplod.js";

// 上传文件
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    msg: "上传成功",
    data: {
      url: `/uploads/${req.file.filename}`,
      name: Buffer.from(req.file.originalname, "latin1").toString("utf8")
    }
  });
});

export default router;
