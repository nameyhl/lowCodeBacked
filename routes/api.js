import express from 'express'
const router = express.Router()

// 路由中间件


// 引入各个分组路由
import routes from './routes.js'

// 使用路由
router.use('/routes', routes)

// 到处路由

export default router;