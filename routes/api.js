import express from 'express'
const router = express.Router()

// 路由中间件


// 引入各个分组路由
import routes from './route/routes.js'
import user from './route/user.js'
import frim from './route/frim.js'
import department from './route/department.js'
import position from './route/position.js'

// 使用路由
router.use('/routes', routes)
router.use('/user', user)
router.use('/frim', frim)
router.use('/department', department)
router.use('/position', position)

// 到处路由
export default router;