import pool from "../configs/mysql.js";

// sql语句
// 插入语句
let insertFrimSql = `INSERT INTO frim (id, name, leaderId, msg) VALUES (?,?,?,?)`; // frim插入语句

// 查询语句
let selectFrimSql = `
SELECT f.*, u.name AS leaderName
FROM frim AS f
LEFT JOIN user AS u ON u.id = f.leaderId `; // 查询所有分公司信息

// 修改语句
let updateFrimSql = `UPDATE frim SET name =?, leaderId =?, msg =? WHERE id =?`; // 修改分公司信息
let updateUserFrimSql = `UPDATE user_frim SET frimId =null WHERE frimId =?`; // 用户组织修改语句
let updateFrimDepartmentSql = `UPDATE frim_department SET frimId =null WHERE frimId =?`; // 部门修改语句
// 删除语句
let deleteFrimSql = `DELETE FROM frim WHERE id =?`; // 删除分公司信息

class frimModel {
  // 新增分公司
  static async addFrim({ id, name, leaderId, msg }) {
    // 创建事务
    const connection = await pool.getConnection();
    try {
      // 开启事务
      await connection.beginTransaction();
      // 插入部门信息
      const [frim] = await connection.execute(insertFrimSql, [
        id,
        name,
        leaderId,
        msg,
      ]);
      // 提交事务
      await connection.commit();
      return frim;
    } catch (error) {
      // 回滚事务
      await connection.rollback();
      throw error;
    }
  }

  // 获取所有分公司
  static async getFrims() {
    try {
      const [frims] = await pool.execute(selectFrimSql);
      return frims;
    } catch (error) {
      throw error;
    }
  }
  // 删除分公司
  static async deleteFrim(id) {
    // 创建事务
    const connection = await pool.getConnection();
    try {
      // 开启事务
      await connection.beginTransaction();

      // 删除分公司与用户关系
      await connection.execute(updateUserFrimSql, [id]);
      // 删除分公司与部门关系
      await connection.execute(updateFrimDepartmentSql, [id]);
      // 提交事务
      await connection.commit();
    } catch (error) {
      // 回滚事务
      await connection.rollback();
      throw error;
    }
    try {
      // 删除分公司信息
      const [frim] = await connection.execute(deleteFrimSql, [id]);
      return frim;
    } catch (error) {
      throw error;
    }
  }

  // 修改分公司
  static async updateFrim({ id, name, leaderId, msg }) {
    const [frim] = await pool.execute(updateFrimSql, [name, leaderId, msg, id]);
    return frim;
  }
}

export default frimModel;
