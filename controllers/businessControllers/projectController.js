import projectService from "../../services/businessServices/projectService.js";
import approvalService from "../../services/businessServices/approvalService.js";
import { asyncHandler } from "../../utils/responseHandler.js";

class projectController {
  static addProject = asyncHandler(async (req, res) => {
    const { name, leaderId, msg, endTime, filePath, fileName } = req.body;
    const result = await projectService.addProject({
      name,
      leaderId,
      msg,
      endTime,
      filePath,
      fileName
    });

    // 新增审批单
    await approvalService.addApproval({
      userId: leaderId,
      approvalType: 1,
      projectId: result
    });
    return { msg: "新增项目成功", data: null };
  });

  static getProjectByCode = asyncHandler(async (req, res) => {
    const { code } = req.query;
    const [result] = await projectService.getProjectByCode(code);
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

  static getProjectListByLeader = asyncHandler(async (req, res) => {
    const { id, level } = req.query;
    const result = await projectService.getProjectListByLeader({ id, level });
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

  static getProjectDetail = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const result = await projectService.getProjectDetail({ id });
    return {
      msg: "获取项目详情成功",
      data: result
    };
  });

  static upDateProjectApprovalInfo = asyncHandler(async (req, res) => {
    const { id, stepNum, states, stepMsg } = req.body;
    await projectService.upDateProjectApprovalInfo({
      id,
      stepNum,
      states,
      stepMsg
    });
    return {
      msg: "更新项目审批信息成功",
      data: null
    };
  });

  static getProjectByLevel = asyncHandler(async (req, res) => {
    const { id, level } = req.query;
    console.log(id, level);
    const result = await projectService.getProjectByLevel({ id, level });
    return {
      msg: "获取项目列表成功",
      data: result
    };
  });

  static updateProjectStatus = asyncHandler(async (req, res) => {
    const { id, status } = req.body;
    await projectService.updateProjectStatus({ id, status });
    return {
      msg: "更新项目状态成功",
      data: null
    };
  });
}

export default projectController;
