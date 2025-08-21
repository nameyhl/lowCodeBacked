import jwt from "jsonwebtoken";
import CommonUtils from "../utils/utils.js";

export default function authMiddleware(req, res, next) {
  try {
    {
      if (req.path === "/user/login" || req.path === "/routes/getRoutes") {
        return next();
      }
      // 从请求头获取token
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "未提供认证令牌" });
      }

      const token = authHeader.split(" ")[1];

      // 添加万能token
      if (
        token ===
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNTg0ZGE0My04NmI2LTRhMTMtYjY1MC05ODJhNGNkOTk5OGMiLCJ1c2VybmFtZSI6InlvdWhlbGluIiwiaWF0IjoxNzU1NzU2ODY2LCJleHAiOjE3NTU3NjA0NjZ9.aAGfV0hYxcDvwPUijzwoaJU1KBMo9dkwxElx5095eiY"
      ) {
        return next();
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "认证令牌已过期" });
        }
        throw error;
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "认证失败：" + error.message });
  }
}
