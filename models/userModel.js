import pool from "../configs/mysql.js";

class userModel {
    // 新增用户
    static async addUser({id, username, password, role }) {
        const [result] = await pool.query('INSERT INTO user (id, username, password, role) values (?,?,?,?)', [id, username, password, role]);
        return result.insertId;
    }
}

export default userModel;