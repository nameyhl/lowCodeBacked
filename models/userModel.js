import pool from "../configs/mysql.js";

class userModel {
    // 新增用户
    static async addUser({id, username, name, nikename, birth, 
        email , wechat, departmentId, password, phone}) {
        const [result] = 
        await pool.query
        (`INSERT INTO 
          user (id, username, name, nikename, birth, email , wechat, departmentId, password, phone) 
          values (?,?,?,?,?,?,?,?,?,?)`,
          [id, username, name, nikename, birth, email , wechat, departmentId, password, phone]);
        return result.insertId;
    }
    // 查询用户
    static async getUser() {
        const [result] = 
        await pool.query
        (`select u.*, TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age, d.name AS departmentName, f.name AS frimName
          from user AS u
          LEFT JOIN department AS d ON u.departmentId = d.id
          LEFT JOIN frim AS f ON d.frimId = f.id`);
        return result;
    }

    // 修改用户
    static async updateUser({id, username, name, nikename, birth, email, wechat, departmentId, phone}) {
        const [result] = 
             await pool.query
             (`UPDATE user SET
                 username = ?, name = ?, nikename = ?, birth = ?, email = ?, wechat = ?, departmentId = ?, phone = ?
                 WHERE id = ?`,
                 [username, name, nikename, birth, email, wechat, departmentId,phone, id ]);
        return result.affectedRows;
    }
    // 删除用户
    static async deleteUser(id) {
        const [result] = await pool.query(`DELETE FROM user WHERE id =?`, [id]);
        return result.affectedRows;
    }

    // 根据departmentId查询用户
    static async getUserByDepartmentId(departmentId) {
        const [result] = await pool.query(`SELECT name, id FROM user WHERE departmentId =?`, [departmentId]);
        return result;
    }

    // 根据frimId查询用户
    static async getUserByFrimId(frimId) {
        const [result] = 
        await pool.query(`
            SELECT u.id, u.name 
            FROM user AS u
            WHERE u.departmentId IN (SELECT d.id AS departmentId
            FROM department AS d
            WHERE d.frimId = ?)`, [frimId]);
        return result;
    }
}

export default userModel;