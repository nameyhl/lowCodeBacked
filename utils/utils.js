// 工具类方法
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class CommonUtils {
  static buildTree(items, parentId = '') {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => {
        const children = this.buildTree(items, item.id).map(child => ({
          ...child,
          parentRouter: item.router // 将父节点的 router 属性放入子节点
        }));
        return {
          ...item,
          children
        };
      });
  }

  // 生成jwt令牌
  static generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  // 验证jwt
  static verifyToken(token) {
    const secret = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      error.status = 400;
      throw error;
    }
  }
}
export default CommonUtils;

