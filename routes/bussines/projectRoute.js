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
router.get("/getProjectById", projectController.getProjectById);
router.get("/getProjectDetail", projectController.getProjectDetail);
router.get("/getProjectListByLeader", projectController.getProjectListByLeader);
router.put(
  "/upDateProjectApprovalInfo",
  projectController.upDateProjectApprovalInfo
);
router.get("/getProjectByLevel", projectController.getProjectByLevel);
router.put("/updateProjectStatus", projectController.updateProjectStatus);
router.delete("/deleteProject", projectController.deleteProject);
router.put("/updateProjectAdress", projectController.updateProjectAdress);
router.get("/getFile", projectController.getFile);

// 创建项目

export default router;
