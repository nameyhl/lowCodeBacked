import pool from "../../configs/mysql.js";

class takeinModel {
  // 新增打卡
  static async addTakein({ id, userId, takeinTime, address }) {
    const [result] = await pool.query(
      `INSERT INTO takein (id, userId, takeinTime, address) values (?,?,?,?)`,
      [id, userId, takeinTime, address]
    );
    return result.insertId;
  }
  // 查询打卡列表
  static async getTakeinList({ userId }) {
    const [result] = await pool.query(
      `SELECT * FROM takeininfo WHERE userId = ?`,
      [userId]
    );
    return result;
  }
}
export default takeinModel;
