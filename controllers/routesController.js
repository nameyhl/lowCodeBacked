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

  // 新增路由
  static addRoute = asyncHandler(async (req) => {
    const { name, router, view, level, parentId, isShow } = req.body;
    const result = await routesService.addRoute({ name, router, view, level, parentId, isShow });
    return result;
  })
  // 批量删除路由
  static deleteRoutes = asyncHandler(async (req) => {
    const { ids } = req.body;
    const result = await routesService.deleteRoutes(ids);
    return result;
  })
}

export default routesController;