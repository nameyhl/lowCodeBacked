import pool from "../configs/mysql.js";

class departmentModel {
  // 新增部门
  static async addDepartment({ id, name, frimId, leaderId, msg }) {
    let sql = `
    INSERT INTO department (id, name, frimId, leaderId, msg)
    VALUES (?, ?, ?, ?, ?)
    `
    try {
      const [department] = await pool.query(sql, [id, name, frimId, leaderId, msg]);
      return department;
    } catch (error) {
      throw error;
    }
  }
  // 获取部门
  static async getDepartment({ name, frimId, size, page }) {
    let selectDepartmentSqlWithLimit = `
    SELECT d.*, f.name AS frimName, u.name AS leaderName
    FROM department AS d
    LEFT JOIN frim AS f ON f.id = d.frimId
    LEFT JOIN user AS u ON u.id = f.leaderId
    WHERE 1 = 1
    `;
    let selectTotleSql = `
    SELECT COUNT(DISTINCT d.id) AS total
    FROM department AS d
    LEFT JOIN frim AS f ON f.id = d.frimId
    LEFT JOIN user AS u ON u.id = f.leaderId
    WHERE 1 = 1
    `;
    try {
      if (name) {
        selectDepartmentSqlWithLimit += ` AND d.name LIKE '%${name}%'`;
        selectTotleSql += ` AND d.name LIKE '%${name}%'`;
      }
      if (frimId) {
        selectDepartmentSqlWithLimit += ` AND fd.frimId = ${frimId}`;
        selectTotleSql += ` AND fd.frimId = ${frimId}`;
      }
      selectDepartmentSqlWithLimit += ` LIMIT ? OFFSET ?`;
      const [departments] = await pool.query(selectDepartmentSqlWithLimit, [
        size,
        page,
      ]);
      const [total] = await pool.query(selectTotleSql);
      return {
        data: departments,
        total: total[0].total,
      };
    } catch (error) {
      throw error;
    }
  }

  // 获取所有部门
  static async getAllDepartment({ name, frimId }) {
    let selectDepartmentSql = `
      SELECT d.*, f.name AS frimName
      FROM department AS d
      LEFT JOIN frim AS f ON f.id = d.frimId
      WHERE 1 = 1 
    `;
    if (name) {
      selectDepartmentSql += ` AND d.name LIKE '%${name}%'`;
    }
    if (frimId) {
      selectDepartmentSql += ` AND d.frimId = ${frimId}`;
    }
    try {
      const [departments] = await pool.query(selectDepartmentSql);
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
