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
router.get("/getProjectDetail", projectController.getProjectDetail);
router.get(
  "/getProjectListByDepartmentLeader",
  projectController.getProjectListByDepartmentLeader
);
router.put(
  "/upDateProjectApprovalInfo",
  projectController.upDateProjectApprovalInfo
);

// 创建项目

export default router;
