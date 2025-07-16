import jwt from "jsonwebtoken";
import config from "../configs/mysql.js";

export default function authMiddleware(req, res, next) {
  console.log(process.env.JWT_SECRET);
  next();
}
