import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "C:/Users/yyy/Desktop/11/nginx-1.28.0/html/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  }
});

// 过滤文件类型
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);

  cb(null, true);
};

export default multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
