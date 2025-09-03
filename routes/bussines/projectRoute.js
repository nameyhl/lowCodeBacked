import express from "express";

import projectController from "../../controllers/businessControllers/projectController.js";

const router = express.Router();

router.post("/addProject", projectController.addProject);
router.get("/getProjectByCode", projectController.getProjectByCode);
router.get("/getProjectList", projectController.getProjectList);
router.get(
  "/getProjectListByLeaderId",
  projectController.getProjectListByLeaderId
);
router.get("/getProjectDetail", projectController.getProjectDetail);
router.get("/getProjectListByLeader", projectController.getProjectListByLeader);
router.put(
  "/upDateProjectApprovalInfo",
  projectController.upDateProjectApprovalInfo
);
router.get("/getProjectByLevel", projectController.getProjectByLevel);

// 创建项目

export default router;
