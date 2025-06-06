import pool from "../configs/mysql.js";

class departmentModel {
    // 新增部门
    static async addDepartment({ id, name, frimId, leaderId, msg}){
        const [result] = await pool.query('INSERT INTO department (id, name, frimId, leaderId, msg) values (?,?,?,?,?)',
        [id, name, frimId, leaderId, msg]);
        return result.insertId;
    }

    // 查询部门
    static async getDepartment(){
        const [result] = await pool.query(`SELECT a.*, b.name AS frimName, c.name AS leaderName
                                           FROM department AS a 
                                           LEFT JOIN frim AS b on a.frimId = b.id 
                                           LEFT JOIN user as c on a.leaderId = c.id
                                           `);
        return result;
    }

    // 修改部门信息
    static async updateDepartment({ id, name, frimId, leaderId, msg }){
        const [result] = 
        await pool.query
        ('UPDATE department SET name = ?, frimId = ?, leaderId = ?, msg = ? WHERE id = ?',
         [name, frimId, leaderId, msg, id]);
        return result.affectedRows;
    }

    // 删除部门信息
    static async deleteDepartment(id){
        const [result] = await pool.query('DELETE FROM department WHERE id =?', [id]);
        return result.affectedRows;
    }
}

export default departmentModel;