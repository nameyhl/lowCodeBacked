// 引入service层级
import routesService from '../services/routesService.js';
// 引入相应的工具类
import { asyncHandler } from "../utils/responseHandler.js";

class routesController {
  // 获取所有路由
  static getRoutes = asyncHandler(async (req) => {
    const routes = await routesService.getRoutes();
    return routes;
  })
}

export default routesController;