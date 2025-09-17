import pool from "../../configs/mysql.js";

class takeinModel {
  // 新增取货
  static async addTakein({ id, userId, takeinTime }) {
    const [result] = await pool.query(
      `INSERT INTO takein (id, userId, takeinTime) values (?,?,?)`,
      [id, userId, takeinTime]
    );
    return result.insertId;
  }
}
export default takeinModel;
