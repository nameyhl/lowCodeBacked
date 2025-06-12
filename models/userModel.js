import pool from "../configs/mysql.js";

// sql语句
// 查询语句
let selectUserSql = `
SELECT u.*, d.name AS departmentName, f.name AS frimName, TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age, d.id AS departmentId, uf.frimId AS frimId
FROM user AS u 
LEFT JOIN user_department AS  ud ON u.id = ud.userId
LEFT JOIN user_frim AS uf ON u.id = uf.userId
LEFT JOIN department AS d ON d.id = ud.departmentId
LEFT JOIN frim AS f ON f.id = uf.frimId
LIMIT ? OFFSET ?`;
let selectTotleSql = `
SELECT COUNT(*) AS total FROM user AS u
`; // 查询总条数语句
let selectUserByDepartmentIdSql = `
SELECT u.name AS name, u.id AS id
FROM user_department as ud
LEFT JOIN user as u ON u.id = ud.userId
WHERE ud.departmentId = ?
`; // 根据部门id查询用户
let selectUserByFrimIdSql = `
SELECT u.name AS name, u.id AS id
from user_frim  AS ud
LEFT JOIN user AS u ON u.id = ud.userId
WHERE ud.frimId = ?`; // 根据组织id查询用户

// 插入语句
let insertUserSql = `
INSERT INTO user (id, username, name, nikename, birth, email, wechat, phone)
 VALUES (?,?,?,?,?,?,?,?)`; // 用户插入语句
let insertUserFrimSql = `
INSERT INTO user_frim (userId, frimId) VALUES (?,?)`; // 用户组织插入语句`
let insertUserDepartmentSql = `
INSERT INTO user_department (departmentId, userId) VALUES (?,?)`; // 部门插入语句

// 修改语句
let updateUserSql = `UPDATE user SET username =?, name =?, nikename =?, birth =?, email =?, wechat =?, phone =? WHERE id =?`; // 用户修改语句
let updateUserFrimSql = `UPDATE user_frim SET frimId =? WHERE userId =?`; // 用户组织修改语句
let updateUserDepartmentSql = `UPDATE user_department SET departmentId =? WHERE userId =?`; // 部门修改语句

// 删除语句
let deleteUserSql = `DELETE FROM user WHERE id = ?`; // 删除用户语句
let deleteUserFrimSql = `DELETE FROM user_frim WHERE userId =?`; // 用户组织删除语句
let deleteUserDepartmentSql = `DELETE FROM user_department WHERE userId =?`; // 部门删除语句
class userModel {
  // 新增用户
  static async addUser(obj) {
    let {
      id,
      username,
      name,
      nikename,
      birth,
      email,
      wechat,
      departmentId,
      frimId,
      phone,
    } = obj;
    // 开始事务
    const transaction = await pool.beginTransaction();
    try {
      // 插入用户信息
      await pool
        .query(insertUserSql, [
          id,
          username,
          name,
          nikename,
          birth,
          email,
          wechat,
          phone,
        ])
        .then(async () => {
          // 插入用户组织信息
          await transaction.query(insertUserFrimSql, [id, frimId]);
          // 插入用户部门信息
          await transaction.query(insertUserDepartmentSql, [departmentId, id]);
          // 提交事务
          await transaction.commit();
        })
        .catch((err) => {
          // 回滚事务
          transaction.rollback();
          // 删除用户信息
          pool.query(`DELETE FROM user WHERE id =?`, [id]);
          throw err;
        });
      return "新增成功";
    } catch (error) {
      // 回滚事务
      await transaction.rollback();
      // 删除用户信息
      pool.query(deleteUserSql, [id]);
      throw error;
    }
  }

  // 查询用户
  static async getUser({ page, size }) {
    const [result] = await pool.query(selectUserSql, [size, page - 1]);
    const [resultTotle] = await pool.query(selectTotleSql);
    return {
      data: result,
      total: resultTotle[0].total,
    };
  }

  // 修改用户
  static async updateUser({
    id,
    username,
    name,
    nikename,
    birth,
    email,
    wechat,
    departmentId,
    phone,
    frimId,
  }) {
    // 创建事务
    const transaction = await pool.beginTransaction();
    try {
      // 修改用户信息
      await transaction.query(updateUserSql, [
        username,
        name,
        nikename,
        birth,
        email,
        wechat,
        phone,
        id,
      ]);
      // 修改用户组织信息
      await transaction.query(updateUserFrimSql, [frimId, id]);
      // 修改用户部门信息
      await transaction.query(updateUserDepartmentSql, [departmentId, id]);
      // 提交事务
      await transaction.commit();
      return "修改成功";
    } catch (error) {
      // 回滚事务
      await transaction.rollback();
      throw error;
    }
  }
  // 删除用户
  static async deleteUser(id) {
    // 创建事务
    const transaction = await pool.beginTransaction();
    try {
      // 删除用户组织信息
      await transaction.query(deleteUserFrimSql, [id]);
      // 删除用户部门信息
      await transaction.query(deleteUserDepartmentSql, [id]);
      // 提交事务
      await transaction.commit();
    } catch (error) {
      // 回滚事务
      await transaction.rollback();
      throw error;
    }
    // 删除用户信息
    await transaction.query(deleteUserSql, [id]);
    return "删除成功";
  }

  // 根据departmentId查询用户
  static async getUserByDepartmentId(departmentId) {
    const [result] = await pool.query(selectUserByDepartmentIdSql, [
      departmentId,
    ]);
    return result;
  }

  // 根据frimId查询用户
  static async getUserByFrimId(frimId) {
    const [result] = await pool.query(selectUserByFrimIdSql, [frimId]);
    return result;
  }
}

export default userModel;
