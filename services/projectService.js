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
      endTime = new Date(endTime);
    }

    const id = new Date().getTime();
    const createTime = new Date();
    const status = 0;
    const code = CommonUtils.generateTimeBasedCode();
    const result = await projectModel.addProject({
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
    return result;
  }

  static async getProjectByCode(code) {
    const result = await projectModel.getProjectByCode(code);
    if (result.length === 0) {
      throw new Error("项目不存在");
    }
    const project = result[0];
    return project;
  }

  static async getProjectList() {
    const result = await projectModel.getProjectList();
    return result;
  }

  static async getProjectListByLeaderId(leaderId) {
    const result = await projectModel.getProjectListByLeaderId(leaderId);

    result.forEach(item => {
      item.endTime = CommonUtils.formatDate(item.endTime);
      item.createTime = CommonUtils.formatDate(item.createTime);
    });

    return result;
  }

  static async updateProjectStatus({ id, status }) {
    const result = await projectModel.updateProjectStatus({ id, status });
    return result;
  }
}

export default projectService;
