import jwt from "jsonwebtoken";
import CommonUtils from '../utils/utils.js';

export default function authMiddleware(req, res, next) {
  try {
    if (req.path === '/user/login' || req.path === '/routes/getRoutes') {
      return next();
    }
    // 从请求头获取token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未提供认证令牌' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = CommonUtils.verifyToken(token);

    // 将用户信息添加到请求对象
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: '认证失败：' + error.message });
  }
}