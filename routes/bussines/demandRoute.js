import express from "express";

import demandController from "../../controllers/businessControllers/demandController.js";

const router = express.Router();

router.post("/addDemand", demandController.addDemand);
router.get("/getDemandList", demandController.getDemandList);
router.put("/updateDemand", demandController.updateDemand);
router.put("/updateDemandStatus", demandController.updateDemandStatus);

export default router;
