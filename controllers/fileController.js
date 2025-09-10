import path from "path";
import fs from "fs";
import { asyncHandler } from "../utils/responseHandler.js";
import { promisify } from "util";

// 文件上传配置
// 上传目录
// 目录不存在则创建目录
const UPLOAD_DIR = path.join("C:\\Users\\yyy\\Desktop\\11\\lowCode", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

class fileController {
  // 文件上传
  static uploadFile = asyncHandler(async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        throw new Error("文件上传失败");
      }

      // 返回文件地址
      return {
        msg: "文件上传成功",
        data: {
          fileName: Buffer.from(file.originalname, "latin1").toString("utf8"),
          fileUrl: file.filename
        }
      };
    } catch (err) {
      throw new Error(err.message);
    }
  });

  // 通过文件地址下载文件
  /**
   * 前端传递文件地址，后端验证后触发下载
   * 逻辑：小文件node直接读取返回，大文件重定向到nginx静态服务（性能更优）
   */
  static downloadFile = (req, res) => {
    try {
      const { filename } = req.params;
      if (!filename) throw new Error("文件名称不能为空");
      console.log(filename);

      const filePath = path.join(UPLOAD_DIR, filename);
      // 安全校验： 确保文件在UPLIOAD_DIR内（防止../../etc/passwd等恶意路径攻击）
      if (!filePath.startsWith(UPLOAD_DIR)) {
        throw new Error("文件路径错误");
      }

      // 检查文件是否存在
      if (!fs.existsSync(filePath)) {
        throw new Error("文件不存在");
      }

      // 区分文件大小
      const fileStats = fs.statSync(filePath);
      const fileSize = fileStats.size;
      const MAX_DIRECT_SEND_SIZE = 10 * 1024 * 1024; // 10MB

      if (fileSize > MAX_DIRECT_SEND_SIZE) {
        // 重定向到Nginx静态地址（/files/是Nginx配置的静态路径）
        const nginxDownloadUrl = `/files/${filename}`;
        return res.redirect(nginxDownloadUrl);
      } else {
        const originalFilename = filename.split("_").slice(1).join("_");
        // 设置响应头：触发浏览器下载
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${encodeURIComponent(filename)}"`
        );
        res.write(fileBuffer);
        res.end();
        res.setHeader("Content-Length", fileSize);
        // 读取文件内容并返回
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  //  通过文件地址获取文件流实现预览

  static getFileSteam = async (req, res) => {
    try {
      // 1. 接收并验证文件地址
      const { filename } = req.params;

      if (!filename) {
        return res
          .status(400)
          .json({ message: "请传递文件地址（filename 参数）" });
      }
      const filePath = path.resolve(UPLOAD_DIR, filename);
      if (!filePath.startsWith(UPLOAD_DIR) || !fs.existsSync(filePath)) {
        return res.status(404).json({ message: "文件不存在或非法" });
      }

      // 2. 限制文件大小（Base64 不适合大文件）
      const fileStats = fs.statSync(filePath);
      const MAX_STREAM_SIZE = 5 * 1024 * 1024; // 5MB
      if (fileStats.size > MAX_STREAM_SIZE) {
        return res
          .status(400)
          .json({ message: "文件过大，不支持获取字节流（建议直接下载）" });
      }

      // 3. 读取文件并转为 Base64
      const readFile = promisify(fs.readFile); // 异步读取（避免阻塞事件循环）
      const fileBuffer = await readFile(filePath);

      // 4. 返回 Base64 数据（含文件类型/大小，方便前端处理）

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(filename)}"`
      );
      res.write(fileBuffer);
      res.end();
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

export default fileController;

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeMap = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".json": "application/json"
  };
  return mimeMap[ext] || "application/octet-stream";
}
