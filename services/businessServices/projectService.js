import projectModel from "../../models/businessModels/projectModel.js";
import CommonUtils from "../../utils/utils.js";

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

  static async deleteProject({ id }) {
    await projectModel.deleteProject({ id });
  }

  static async getProjectByCode(code) {
    let result = await projectModel.getProjectByCode(code);
    if (result.length === 0) {
      throw new Error("项目不存在");
    }
    const project = CommonUtils.formatDateInObject(result);
    return project;
  }

  static async getProjectById({ id }) {
    let result = await projectModel.getProjectById({ id });
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

  static async getProjectListByLeader({ id, level }) {
    let result = await projectModel.getProjectListByLeader({ id, level });
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async upDateProjectApprovalInfo({ id, stepNum, states, stepMsg }) {
    let step = stepNum;
    if (states === "pass") {
      states = 1;
      step++;
    } else if (states === "reject") {
      states = 2;
    }
    let endTime = new Date();
    endTime = CommonUtils.formatDate(endTime);
    await projectModel.upDateProjectApprovalInfo({
      id,
      stepNum,
      states,
      stepMsg,
      endTime,
      step
    });
    let res = null;
    if (stepNum == 2 && states == 1) {
      res = await projectModel.updateProjectStatus({ id, status: 1 });
    }
    return res;
  }

  static async getProjectByLevel({ id, level }) {
    let result = [];
    if (level == "department") {
      let departmentResult = await projectModel.getProjectListByDepartment(id);
      result = CommonUtils.formatDateInObject(departmentResult);
    }
    if (level == "frim") {
      let frimResult = await projectModel.getProjectListByFrim(id);
      result = CommonUtils.formatDateInObject(frimResult);
    }
    return result;
  }

  static async updateProjectStatus({ id, status }) {
    let result = await projectModel.updateProjectStatus({ id, status });
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async updateProjectAdress({
    id,
    designAddress,
    frontCodeAddress,
    backCodeAddress
  }) {
    let promiseList = [];
    if (designAddress) {
      promiseList.push(
        projectModel.updateProjectDesignAddress({ id, designAddress })
      );
    }
    if (frontCodeAddress) {
      promiseList.push(
        projectModel.updateProjectFrontCodeAddress({ id, frontCodeAddress })
      );
    }
    if (backCodeAddress) {
      promiseList.push(
        projectModel.updateProjectBackCodeAddress({ id, backCodeAddress })
      );
    }
    await Promise.all(promiseList);
    return {
      data: null,
      msg: "修改成功"
    };
  }
}

export default projectService;
