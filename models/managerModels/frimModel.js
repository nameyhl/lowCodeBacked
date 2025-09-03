import pool from "../../configs/mysql.js";

class frimModel {
  // 新增分公司
  static async addFrim({ id, name, msg }) {
    let addSql = `
    INSERT INTO frim (id, name, msg)
    VALUES (?, ?, ?)
    `;
    try {
      const [frim] = await pool.execute(addSql, [id, name, msg]);
      return frim;
    } catch (error) {
      throw error;
    }
  }

  // 分页获取所有分公司
  static async getFrims({ size, page }) {
    let selectFrimSqlWithLimit = `SELECT f.*, u.name AS leaderName
    FROM frim AS f
    LEFT JOIN user AS u ON u.id = f.leaderId
    WHERE 1 = 1`;
    selectFrimSqlWithLimit += `\nLIMIT ? OFFSET ?`;
    let selectTotleSql = `
    SELECT COUNT(DISTINCT f.id) AS total
    FROM frim AS f
    WHERE 1 = 1`;
    try {
      const [frims] = await pool.query(selectFrimSqlWithLimit, [size, page]);
      const [total] = await pool.query(selectTotleSql);
      return {
        data: frims,
        total: total[0].total
      };
    } catch (error) {
      throw error;
    }
  }

  // 获取所有分公司
  static async getAllFrims() {
    let selectFrimSql = `
      SELECT * FROM frim
      WHERE 1 = 1
    `;
    try {
      const [frims] = await pool.query(selectFrimSql);
      return frims;
    } catch (error) {
      throw error;
    }
  }
  // 删除分公司
  static async deleteFrim(id) {
    let deleteSql = `
    DELETE FROM frim
    WHERE id = ?
    `;
    try {
      const [frim] = await pool.execute(deleteSql, [id]);
      return frim;
    } catch (error) {
      throw error;
    }
  }

  // 修改分公司
  static async updateFrim({ id, name, leaderId, msg }) {
    let updateFrimSql = `
    UPDATE frim
    SET name = ?, leaderId = ?, msg = ?
    WHERE id = ?
    `;
    try {
      const [frim] = await pool.execute(updateFrimSql, [
        name,
        leaderId,
        msg,
        id
      ]);
      return frim;
    } catch (error) {
      throw error;
    }
  }
}

export default frimModel;
