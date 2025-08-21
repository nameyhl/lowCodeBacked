import pool from "../configs/mysql.js";

/**
 *  project表字段
 * id：项目id，code: 项目代码，name: 项目名称， leaderId: 项目负责人，msg： 项目描述
 * createTime：创建事件， status: 项目进度(0: 已提交， 1: 需求分析，2：设计，3：开发，4：测试，5：完成)

 */

class projectModel {
  static async addProject({
    id,
    code,
    name,
    leaderId,
    msg,
    createTime,
    status
  }) {
    const [result] = await pool.query(
      `INSERT INTO project (id, code, name, leaderId, msg, createTime, status) values (?,?,?,?,?,?,?)`,
      [id, code, name, leaderId, msg, createTime, status]
    );
    return result.affectedRows;
  }

  // 通过code获取项目
  static async getProjectByCode(code) {
    const [result] = await pool.query(
      `SELECT p.*, u.name AS leaderName FROM project As p WHERE p.code = ? LEFT JOIN user AS u ON u.id = p.leaderId`,
      [code]
    );
    return result;
  }

  // 获取所有项目
  static async getProjectList() {
    const [result] = await pool.query(
      `SELECT p.*, u.name AS leaderName FROM project As p  LEFT JOIN user AS u ON u.id = p.leaderId`
    );
    return result;
  }

  // 通过leaderId获取项目列表
  static async getProjectListByLeaderId(leaderId) {
    const [result] = await pool.query(
      `SELECT p.*, u.name AS leaderName FROM project AS p LEFT JOIN user AS u ON u.id = p.leaderId  WHERE leaderId = ?`,
      [leaderId]
    );
    return result;
  }

  // 修改项目状态
  static async updateProjectStatus({ id, status }) {
    const [result] = await pool.query(
      `UPDATE project SET status = ? WHERE id = ?`,
      [status, id]
    );
    return result.affectedRows;
  }
}

export default projectModel;
