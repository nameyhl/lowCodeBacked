import pool from "../configs/mysql.js";

class positionModel {
  // 新增职位
  static async addPosition({ id, name, departmentId, msg, frimId }) {
    const [result] = await pool.query(
      `INSERT INTO job (id, name, departmentId, frimId, msg) values (?,?,?,?,?)`,
      [id, name, departmentId, frimId, msg]
    );
    return result.insertId;
  }
  // 查询职位
  static async getPositions({ departmentId, name, page, size }) {
    let sql = `
    SELECT j.*, d.name AS departmentName, u.name AS leaderName 
    FROM job AS j LEFT JOIN department AS d ON j.departmentId = d.id 
    LEFT JOIN user AS u ON j.leaderId = u.id
    WHERE 1 = 1 
    `
    let totalSql = `
    SELECT COUNT(*) AS total FROM job
    WHERE 1 = 1 
    `
    if (departmentId) {
      sql += ` AND j.departmentId = ${departmentId}`;
      totalSql += ` AND j.departmentId = ${departmentId}`;
    }
    if (name) {
      sql += ` AND j.name LIKE '%${name}%'`;
      totalSql += ` AND j.name LIKE '%${name}%'`;
    }
    sql += ` limit ? offset ?`
    const [result] = await pool.query(sql, [size, page]);
    const total = await pool.query(totalSql);
    return { data: result, total: total[0].total };
  }

  static getALlPosition = async ({ departmentId }) => {
    let sql = `SELECT * FROM job WHERE 1 = 1`
    if (departmentId) {
      sql += ` AND departmentId = ${departmentId}`
    }
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (error) {
      throw error
    }

  }

  static async deletePosition(id) {
    const [result] = await pool.query(`DELETE FROM job WHERE id = ?`, [id]);
    return result.affectedRows;
  }
}

export default positionModel;
