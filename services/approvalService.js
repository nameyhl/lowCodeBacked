import projectApprovalModel from "../models/projectApproval.js";
import userModel from "../models/userModel.js";

class approvalService {
  // 新增审批单
  static async addApproval({ projectId, userId }) {
    try {
      const id = new Date().getTime();
      const createTime = new Date().toLocaleString();
      const result = await userModel.getFrimLeaderAndDepartmentLader(userId);
      const status = 2;
      const step = 1;
      let { frimLeader, departmentLeader } = result[0];
      projectApprovalModel.addProjectApproval({
        id,
        status,
        step,
        projectId,
        departmentLeader,
        frimLeader,
        createTime
      });
    } catch (error) {
      throw error;
    }
  }
}

export default approvalService;
