import pool from "../configs/mysql.js";

class frimModel {
    // 新增分公司
    static async addFrim({ id, name, leaderId, msg}){
        const [result] = await pool.query('INSERT INTO frim (id, name, leaderId, msg) values (?,?,?,?)',
        [id, name, leaderId, msg]);
        return result.insertId;
    }

    // 获取所有分公司
    static async getFrims(){
        const [result] = await pool.query(`
            SELECT f.*, u.name as leaderName
FROM frim AS f
LEFT JOIN user AS u ON f.leaderId = u.id `);
        return result;
    }
    // 删除分公司
    static async deleteFrim(id){
        const [result] = await pool.query('DELETE FROM frim WHERE id = ?', [id]);
        return result.affectedRows;
    }

    // 修改分公司
    static async updateFrim({ id, name, leaderId, msg}){
        const [result] = await pool.query('UPDATE frim SET name = ?, leaderId = ?, msg = ? WHERE id = ?', [name, leaderId, msg, id]);
        return result.affectedRows;
    }

}

export default frimModel;