import pool from "../configs/mysql.js";
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
      positionId,
      phone,
    } = obj;
    // 开始事务
    try {
      let sql = `INSERT INTO user (id, username, name, nikename, birth, email, wechat, departmentId, frimId,positionId, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      let [result] = await pool.query(sql, [
        id,
        username,
        name,
        nikename,
        birth,
        email,
        wechat,
        departmentId,
        frimId,
        positionId,
        phone,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // 查询用户
  static async getUser({ page, size, username, name, departmentId }) {
    let selectUserSql = `
    SELECT u.*, TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age, d.name AS departmentName, f.name AS frimName, j.name AS positionName 
    FROM user as u 
    LEFT JOIN department AS d ON u.departmentId = d.id
    LEFT JOIN frim AS f ON u.frimId = f.id
    LEFT JOIN job AS j ON u.positionId = j.id
    WHERE 1=1
`;
    let selectTotleSql = `
    SELECT COUNT(DISTINCT u.id) AS total
    FROM user AS u
    WHERE 1 = 1`;
    let params = [size, page];
    if (username) {
      selectUserSql += `\nAND u.username LIKE '%${username}%'`;
      selectTotleSql += `\nAND u.username LIKE '%${username}%'`;
    }
    if (name) {
      selectUserSql += `\nAND u.name LIKE '%${name}%'`;
      selectTotleSql += `\nAND u.name LIKE '%${name}%'`;
    }
    if (departmentId) {
      selectUserSql += `\nAND ud.departmentId = ${departmentId}`;
      selectTotleSql += `\nAND ud.departmentId = ${departmentId}`;
    }
    selectUserSql += `\nLIMIT ? OFFSET ?`;
    const [result] = await pool.query(selectUserSql, params);
    const [resultTotle] = await pool.query(selectTotleSql);
    return {
      data: result,
      total: resultTotle[0].total,
    };
  }

  static async getAllUser({ departmentId, frimId, positionId }) {
    let selectSql = `
    SELECT u.name, u.id
    FROM user AS u
    WHERE 1 = 1
    `;
    if (departmentId) selectSql += ` AND u.departmentId = ${departmentId}`;
    if (frimId) selectSql += ` AND u.frimId = ${frimId}`;
    if (positionId) selectSql += ` AND u.positionId = ${positionId}`;
    const [result] = await pool.query(selectSql);
    return result;
  }

  // 修改用户
  static async updateUser(data) {
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
      positionId,
      phone,
    } = data;
    try {
      let sql = `UPDATE user SET username = ?, name = ?, nikename = ?, birth = ?, email = ?, wechat = ?, departmentId = ?, frimId = ?, positionId = ?, phone = ? WHERE id = ?`;
      let [result] = await pool.query(sql, [
        username,
        name,
        nikename,
        birth,
        email,
        wechat,
        departmentId,
        frimId,
        positionId,
        phone,
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // 删除用户
  static async deleteUser(id) {
    // 创建事务
    let deleteSql = `DELETE FROM user WHERE id = ?`;
    try {
      let result = await pool.query(deleteSql, [id]);
      return "删除成功";
    } catch (error) {
      throw error;
    }
  }

  // 根据departmentId查询用户
  static async getUserByDepartmentId(departmentId) {
    const [result] = await pool.query(selectUserByDepartmentIdSql, [
      departmentId,
    ]);
    return result;
  }
}

export default userModel;
