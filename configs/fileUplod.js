import multer from "multer";
import path from "path";

const uploadPath = "D:\\codes\\myProject\\lowCode\\uploads"
// const uploadPath = "C:\\Users\\yyy\\Desktop\\11\\lowCode\\uploads"

const storage = multer.diskStorage({
  destination: uploadPath,

  filename: (req, file, cb) => {
    console.log(file);
    const encodedName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, `${Date.now()} - ${encodedName}`);
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
