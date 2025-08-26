// 工具类方法
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

class CommonUtils {
  static buildTree(items, parentId = "") {
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
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
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

  // 生成一个唯一的四位数code
  static generateTimeBasedCode() {
    const now = new Date();
    const timePart = now.getTime().toString(36).slice(-3).toUpperCase();
    const randomChar = Math.random().toString(36).charAt(2).toUpperCase();
    return timePart + randomChar;
  }

  // 将再数据库中查询到的时间数据改为YYYY-MM-DD格式
  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 格式化时间(只有年月日)
  static formatDate(time = new Date()) {
    const date4 = new Date(time);
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return formatter.format(date4).replace(/\//g, "-");
  }

  // 遍历查询到的对象，将时间格式的数据全部格式化
  static formatDateInObject(obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof Date) {
        obj[key] = this.formatDate(value);
      }
    }
    return obj;
  }
}
export default CommonUtils;
