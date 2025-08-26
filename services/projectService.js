import projectModel from "../models/projectModel.js";
import CommonUtils from "../utils/utils.js";

class projectService {
  static async addProject({
    name,
    leaderId,
    msg,
    endTime,
    filePath,
    fileName
  }) {
    if (endTime) {
      endTime = CommonUtils.formatDate(endTime);
    }

    const id = new Date().getTime();
    const createTime = CommonUtils.formatDate();
    const status = 0;
    const code = CommonUtils.generateTimeBasedCode();
    await projectModel.addProject({
      id,
      code,
      name,
      leaderId,
      msg,
      createTime,
      status,
      endTime,
      filePath,
      fileName
    });
    return id;
  }

  static async getProjectByCode(code) {
    let result = await projectModel.getProjectByCode(code);
    if (result.length === 0) {
      throw new Error("项目不存在");
    }
    const project = CommonUtils.formatDateInObject(result);
    return project;
  }

  static async getProjectList() {
    let result = await projectModel.getProjectList();
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async getProjectListByLeaderId(leaderId) {
    let result = await projectModel.getProjectListByLeaderId(leaderId);

    result.forEach(item => {
      item = CommonUtils.formatDateInObject(item);
    });

    return result;
  }

  static async updateProjectStatus({ id, status }) {
    let result = await projectModel.updateProjectStatus({ id, status });
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async getProjectDetail({ id }) {
    let [result] = await projectModel.getProjectDetail(id);
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async getProjectListByDepartmentLeader(id) {
    let result = await projectModel.getProjectListByDepartmentLeader(id);
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async upDateProjectApprovalInfo({ id, stepNum, states, stepMsg }) {
    stepNum++;
    if (states === "pass") {
      states = 1;
    } else if (states === "reject") {
      states = 2;
    }
    await projectModel.upDateProjectApprovalInfo({
      id,
      stepNum,
      states,
      stepMsg
    });
    return null;
  }
}

export default projectService;
