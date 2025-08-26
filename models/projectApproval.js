import pool from "../configs/mysql.js";

/**
 * @param id 审批单id
 * @param projectId 项目id
 * @param step1Msg 步骤1审批消息
 * @param departmentLeader 部门领导审批消息
 * @param step2Msg 步骤2审批消息
 * @param frimLeader 负责人审批消息
 * @param createTime 审批单创建时间
 * @param updateTime 审批单更新时间
 * @param approvalId 审批单编号
 */
class projectApprovalModel {
  // 新增project审批
  static addProjectApproval = async ({
    id,
    status,
    step,
    projectId,
    departmentLeader,
    frimLeader,
    createTime
  }) => {
    let sql = `
      insert into projectapproval (id, status, step, projectId, departmentLeader, frimLeader, createTime)
      values (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const [projectApproval] = await pool.query(sql, [
        id,
        status,
        step,
        projectId,
        departmentLeader,
        frimLeader,
        createTime
      ]);
      return projectApproval;
    } catch (error) {
      throw error;
    }
  };
}

export default projectApprovalModel;
