import projectApprovalModel from "../../models/businessModels/projectApproval.js";
import userModel from "../../models/managerModels/userModel.js";

class approvalService {
  // 新增审批单
  static async addApproval({ projectId, userId }) {
    try {
      const id = new Date().getTime();
      const createTime = new Date().toLocaleString();
      const result = await userModel.getFrimLeaderAndDepartmentLader(userId);
      const status = 2;
      const step = 1;
      const step1Status = 3;
      let { frimLeader, departmentLeader } = result[0];
      projectApprovalModel.addProjectApproval({
        id,
        status,
        step,
        projectId,
        departmentLeader,
        frimLeader,
        createTime,
        step1Status
      });
    } catch (error) {
      throw error;
    }
  }

  // 删除审批单
  static async deleteApprovalByProjectId({ id }) {
    try {
      await projectApprovalModel.deleteApprovalByProjectId({ id });
    } catch (error) {
      throw error;
    }
  }
}

export default approvalService;
