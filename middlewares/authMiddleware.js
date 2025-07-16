import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(req, res, next) {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  next();
}
