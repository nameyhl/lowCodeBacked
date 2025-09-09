import pool from "../../configs/mysql.js";

/**
 * 需求模型
 * @param {*} name 需求名称
 * @param {*} projectId 项目id
 * @param {*} msg 需求描述
 * @param {*} endTime 需求结束时间
 */

class demandModel {
  // 获取需求列表
  static async getDemandList(id) {
    let sql = `SELECT * FROM demand WHERE projectId = ? ORDER BY createTime asc`;
    let [result] = await pool.query(sql, [id]);
    return result;
  }

  // 删除需求
  static async deleteDemandByProjectId({ id }) {
    let sql = `DELETE FROM demand WHERE projectId = ?`;
    let [result] = await pool.query(sql, [id]);
    return result;
  }

  // 添加需求
  static async addDemand({ name, projectId, design, endTime, createTime }) {
    let sql = `INSERT INTO demand (name, projectId, design, endTime, createTime) VALUES (?, ?, ?, ?, ?)`;
    let [result] = await pool.query(sql, [
      name,
      projectId,
      design,
      endTime,
      createTime
    ]);
    return result;
  }

  // 更新需求
  static async updateDemand({ id, name, design, endTime, updateTime, status }) {
    let sql = `UPDATE demand SET name = ?, design = ?, endTime = ?, updateTime = ?, status = ? WHERE id = ?`;
    let [result] = await pool.query(sql, [
      name,
      design,
      endTime,
      updateTime,
      status,
      id
    ]);
    return result;
  }

  // 修改需求状态
  static async updateDemandStatus({ id, status }) {
    let sql = `UPDATE demand SET status = ? WHERE id = ?`;
    let [result] = await pool.query(sql, [status, id]);
    return result;
  }

  // 修改需求状态
  static async updateDemandStatusByReject({ id, status, rejectMsg }) {
    let sql;
    if (status === 3) {
      sql = `UPDATE demand SET status = ?, devReject = ? WHERE id = ?`;
    }
    if (status === 6) {
      sql = `UPDATE demand SET status = ?, testReject = ? WHERE id = ?`;
    }
    let [result] = await pool.query(sql, [status, rejectMsg, id]);
    return result;
  }
}
export default demandModel;
