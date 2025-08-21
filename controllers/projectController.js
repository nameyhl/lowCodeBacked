import projectService from "../services/projectService.js";
import { asyncHandler } from "../utils/responseHandler.js";

class projectController {
  static addProject = asyncHandler(async (req, res) => {
    const { name, leaderId, msg } = req.body;
    const result = await projectService.addProject({
      name,
      leaderId,
      msg
    });
    return { msg: "新增项目成功", data: null };
  });

  static getProjectByCode = asyncHandler(async (req, res) => {
    const { code } = req.query;
    const result = await projectService.getProjectByCode(code);
    return {
      msg: "获取项目成功",
      data: result
    };
  });

  static getProjectList = asyncHandler(async (req, res) => {
    const result = await projectService.getProjectList();
    return {
      msg: "获取项目列表成功",
      data: result
    };
  });

  static getProjectListByLeaderId = asyncHandler(async (req, res) => {
    const { leaderId } = req.query;
    const result = await projectService.getProjectListByLeaderId(leaderId);
    return {
      msg: "获取项目列表成功",
      data: result
    };
  });

  static updateProjectStatus = asyncHandler(async (req, res) => {
    const { id, status } = req.body;
    const result = await projectService.updateProjectStatus({ id, status });
    return {
      msg: "更新项目状态成功",
      data: null
    };
  });
}

export default projectController;
