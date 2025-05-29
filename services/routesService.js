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
    // 根据时间戳生成唯一id
    route.id = new Date().getTime().toString();
    const result = await routesModels.addRoute(route);
    return result;
  }
}

// 导出路由service层
export default routesService;