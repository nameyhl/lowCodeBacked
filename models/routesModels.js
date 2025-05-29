import pool from '../configs/mysql.js';

class routesModels {
  // 获取所有路由
  static async getAllRoutes() {
    const [routes] = await pool.query('SELECT * FROM routes');
    return routes;
  }

  // 新增路由
  static async addRoute({ id, name, path, view, level, parentId, isShow }) {
    console.log({ id, name, path, view, level, parentId, isShow });
    
    const [result] = await pool.query('INSERT INTO routes (id, name, router, view, level, parentId, isShow) values (? ,? ,? ,? ,? ,? ,?)',
         [id, name, path, view, level, parentId, isShow]);
    return result.insertId;
  }
}

export default routesModels;

