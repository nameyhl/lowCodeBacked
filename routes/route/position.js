import express from "express";
const router = express.Router();

import positionController from "../../controllers/positionController.js";

router.post("/addPosition", positionController.addPosition);
router.get("/getPositionList", positionController.getPosition);
router.delete("/deletePosition", positionController.deletePosition);
router.put("/updatePosition", positionController.updatePosition);

export default router;
