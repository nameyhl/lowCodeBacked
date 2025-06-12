import pool from "../configs/mysql.js";

// sql语句
let insertDepartmentSql = `INSERT INTO department (id, name, leaderId, msg) VALUES (?,?,?,?)`; // department插入语句
let insertFrimDepartmentSql = `INSERT INTO frim_department (departmentId, frimId) VALUES (?,?)`; // frim_department插入语句
let selectDepartmentSql = `
SELECT d.*, u.name AS leaderName, f.name AS frimName
FROM department AS d
LEFT JOIN user AS u ON u.id = d.leaderId
LEFT JOIN frim_department as fd ON d.id = fd.departmentId
LEFT JOIN frim AS f ON f.id = fd.frimId `;
let updateDepartmentSql = `UPDATE department SET name = ?, leaderId = ?, msg = ? WHERE id = ?`;
let updateFrimDepartmentSql = `UPDATE frim_department SET frimId =? WHERE departmentId =?`;
let deleteDepartment = `DELETE FROM department WHERE id =?`;
let deleteFrimDepartment = `DELETE FROM frim_department WHERE departmentId =?`;
let selectFrimId = `SELECT frimId FROM frim_department WHERE departmentId = ?`;
class departmentModel {
  // 新增部门
  static async addDepartment({ id, name, frimId, leaderId, msg }) {
    // 开启事务
    const transaction = await pool.beginTransaction();
    try {
      // 插入部门信息
      const [department] = await transaction.query(insertDepartmentSql, [
        id,
        name,
        leaderId,
        msg,
      ]);
      // 插入部门与组织关系
      await transaction.query(insertFrimDepartmentSql, [id, frimId]);
      // 提交事务
      await transaction.commit();
      return department;
    } catch (error) {
      // 出错时回滚
      await transaction.rollback();
      throw error;
    }
  }
  // 获取部门
  static async getDepartment() {
    try {
      const [departments] = await pool.execute(selectDepartmentSql);
      return departments;
    } catch (error) {
      throw error;
    }
  }
  // 修改部门
  static async updateDepartment({ id, name, frimId, leaderId, msg }) {
    //开启事务
    const transaction = await pool.beginTransaction();
    try {
      // 修改部门信息
      const [department] = await transaction.query(updateDepartmentSql, [
        name,
        leaderId,
        msg,
        id,
      ]);
      // 修改部门与组织关系
      await transaction.query(updateFrimDepartmentSql, [frimId, id]);
      // 提交事务
      await transaction.commit();
      return department;
    } catch (error) {
      // 回滚事务
      await transaction.rollback();
    }
  }
  // 删除部门
  static async deleteDepartment(id) {
    // 创建事务
    const connection = await pool.getConnection();
    try {
      // 开启事务
      await connection.beginTransaction();
      // 删除部门与组织关系
      await connection.execute(deleteFrimDepartment, [id]);
      // 删除部门信息
      await connection.execute(deleteDepartment, [id]);
      // 提交事务
      await connection.commit();
    } catch (error) {
      // 回滚事务
      await connection.rollback();
      throw error;
    }
  }
  // 查询部门的frimId
  static async getFrimId(id) {
    try {
      const [frimId] = await pool.execute(selectFrimId, [id]);
      return frimId;
    } catch (error) {
      throw error;
    }
  }
}

export default departmentModel;
