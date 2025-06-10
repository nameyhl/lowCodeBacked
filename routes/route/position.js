import express from 'express';
const router = express.Router();

import positionController from '../../controllers/positionController.js';

router.post('/addPosition', positionController.addPosition);

export default router;