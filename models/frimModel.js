import pool from "../configs/mysql.js";

class frimModel {
    // 新增分公司
    static async addFrim({ id, name, leader, msg}){
        const [result] = await pool.query('INSERT INTO frim (id, name, leaderId, msg) values (?,?,?,?)',
        [id, name, leader, msg]);
        return result.insertId;
    }

    // 获取所有分公司
    static async getFrims(){
        const [result] = await pool.query('SELECT * FROM frim');
        return result;
    }
    // 删除分公司
    static async deleteFrim(id){
        const [result] = await pool.query('DELETE FROM frim WHERE id = ?', [id]);
        return result.affectedRows;
    }

    // 修改分公司
    static async updateFrim({ id, name, leader, msg}){
        const [result] = await pool.query('UPDATE frim SET name = ?, leaderId = ?, msg = ? WHERE id = ?', [name, leader, msg, id]);
        return result.affectedRows;
    }

}

export default frimModel;