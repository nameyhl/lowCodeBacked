import express from 'express'
const router = express.Router()

import frimController from '../../controllers/frimController.js'

router.post('/addFrim', frimController.addFrim)
router.get('/getFrims', frimController.getFrims)
router.post('/deleteFrim', frimController.deleteFrim)
router.post('/updateFrim', frimController.updateFrim)

export default router