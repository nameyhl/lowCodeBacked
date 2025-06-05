import express from 'express'
const router = express.Router()

import departmentController from '../../controllers/departmentController.js'

router.post('/addDepartment', departmentController.addDepartment)
router.get('/getDepartment', departmentController.getDepartment)
router.post('/updateDepartment', departmentController.updateDepartment)
router.delete('/deleteDepartment', departmentController.deleteDepartment)
export default router