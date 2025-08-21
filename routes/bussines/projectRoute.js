import express from "express";

import projectController from "../../controllers/projectController.js";

const router = express.Router();

router.post("/addProject", projectController.addProject);
router.get("/getProjectByCode", projectController.getProjectByCode);
router.get("/getProjectList", projectController.getProjectList);
router.get(
  "/getProjectListByLeaderId",
  projectController.getProjectListByLeaderId
);

// 创建项目

export default router;
