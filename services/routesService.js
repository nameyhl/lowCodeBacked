// 引入model层
import routesModels from '../models/routesModels.js';
// 引入通用方法
import CommonUtils from '../utils/utils.js';

class routesService {
  // 获取所有路由
  static async getRoutes() {
    const routes = await routesModels.getAllRoutes();
    let result = {
      tree: CommonUtils.buildTree(routes),
      list: routes,
    };
    return result;
  }

  // 新增路由
  static async addRoute(route) {
    if (route.parentId === ' ') route.parentId = null;
    // 根据时间戳生成唯一id
    route.id = new Date().getTime().toString();
    const result = await routesModels.addRoute(route);
    return result;
  }

  // 根据parentId获取子路由
  static async getChildrenRoutes(parentId) {
    const routes = await routesModels.getChildrenRoutes(parentId);
    return routes;
  }

  // 批量删除路由
  static async deleteRoutes(id) {
    // 查询所有的后代
    const routes = await routesModels.getChildrenRoutes(id);
    // 递归删除所有的后代
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      await routesModels.deleteRoute(route.id);
      await this.deleteRoutes(route.id);
    }
    // 删除当前节点
    const result = await routesModels.deleteRoute(id);
    return result;
  }
}

// 导出路由service层
export default routesService;