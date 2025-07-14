import pool from "../configs/mysql.js";

class positionModel {
  // 新增职位
  static async addPosition({ id, name, departmentId, leaderId }) {
    const [result] = await pool.query(
      `INSERT INTO job (id, name, departmentId, leaderId) values (?,?,?,?)`,
      [id, name, departmentId, leaderId]
    );
    return result.insertId;
  }
  // 查询职位
  static async getPositions() {
    const [result] = await pool.query(
      `SELECT j.*, d.name AS departmentName, u.name AS leaderName 
      FROM job AS j LEFT JOIN department AS d ON j.departmentId = d.id 
      LEFT JOIN user AS u ON j.leaderId = u.id`
    );
    return result;
  }

  static async getPositionsTotal() {
    const [result] = await pool.query(`SELECT COUNT(*) AS total FROM job`);
    return result[0].total;
  }

  static async deletePosition(id) {
    const [result] = await pool.query(`DELETE FROM job WHERE id = ?`, [id]);
    return result.affectedRows;
  }
}

export default positionModel;
