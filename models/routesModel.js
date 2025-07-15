import pool from "../configs/mysql.js";

class routesModels {
  // 获取所有路由
  static async getAllRoutes() {
    const [routes] = await pool.query("SELECT * FROM routes");
    return routes;
  }

  // 新增路由
  static async addRoute({ id, name, router, view, level, parentId, isShow }) {
    const [result] = await pool.query(
      "INSERT INTO routes (id, name, router, view, level, parentId, isShow) values (? ,? ,? ,? ,? ,? ,?)",
      [id, name, router, view, level, parentId, isShow]
    );
    return result.insertId;
  }

  // 批量删除路由
  static async deleteRoutes(ids) {
    const [result] = await pool.query("DELETE FROM routes WHERE id IN (?)", [
      ids,
    ]);
    return result.affectedRows;
  }

  // 删除单个路由
  static async deleteRoute(id) {
    const [result] = await pool.query("DELETE FROM routes WHERE id = ?", [id]);
    return result.affectedRows;
  }

  // 根据parentId获取子路由
  static async getChildrenRoutes(parentId) {
    const [routes] = await pool.query(
      "SELECT * FROM routes WHERE parentId = ?",
      [parentId]
    );
    return routes;
  }

  // 修改路由
  static async updateRoute({
    id,
    name,
    router,
    view,
    level,
    parentId,
    isShow,
  }) {
    const [result] = await pool.query(
      "UPDATE routes SET name = ?, router = ?, view = ?, level = ?, parentId = ?, isShow = ? WHERE id = ?",
      [name, router, view, level, parentId, isShow, id]
    );
    return result.affectedRows;
  }

  // 查询路由
  static async searchRoutes({
    id,
    name,
    router,
    view,
    level,
    parentId,
    isShow,
  }) {
    let params = [];
    let sql = "SELECT * FROM routes WHERE 1 = 1";
    if (id) {
      sql += " AND id = ?";
      params.push(id);
    }
    if (name) {
      sql += " AND name = ?";
      params.push(name);
    }
    if (router) {
      sql += " AND router = ?";
      params.push(router);
    }
    if (view) {
      sql += " AND view = ?";
      params.push(view);
    }
    if (level) {
      sql += " AND level = ?";
      params.push(level);
    }
    if (parentId) {
      sql += " AND parentId = ?";
      params.push(parentId);
    }
    if (isShow) {
      sql += " AND isShow = ?";
      params.push(isShow);
    }
    const [routes] = await pool.query(sql, params);
    return routes;
  }
}

export default routesModels;
