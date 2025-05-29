// 引入model层
import routesModels from '../models/routesModels.js';
// 引入通用方法
import CommonUtils from '../utils/utils.js';

class routesService {
  // 获取所有路由
  static async getRoutes() {
    const routes = await routesModels.getAllRoutes();
    return CommonUtils.buildTree(routes);
  }
}

// 导出路由service层
export default routesService;