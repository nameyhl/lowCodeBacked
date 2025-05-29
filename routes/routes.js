import express from 'express'
const router = express.Router()
import routesController from '../controllers/routesController.js'

// 获取所有路由
router.get('/getRoutes', routesController.getRoutes)
// 新增路由
router.post('/addRoute', routesController.addRoute)

export default router