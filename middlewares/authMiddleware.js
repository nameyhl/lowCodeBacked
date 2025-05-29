import jwt from '../config/jwt.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        const err = new Error('未提供token');
        err.status = 401;
        throw err;
    }

    try {
        const decoded = jwt.verify(token);
        req.user = decoded;
        next();
    } catch (error) {
        const err = new Error('无效的token');
        err.status = 401;
        throw err;
    }
}