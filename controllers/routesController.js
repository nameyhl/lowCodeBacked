// 引入service层级
import routesService from "../services/routesService.js";
// 引入相应的工具类
import { asyncHandler } from "../utils/responseHandler.js";

class routesController {
  // 获取所有路由
  static getRoutes = asyncHandler(async req => {
    const { name } = req.query;
    const routes = await routesService.getRoutes({ name });
    return {
      msg: "获取路由成功",
      data: routes
    };
  });

  static getRoutesByParentId = asyncHandler(async req => {
    const { parentId } = req.body;
    const routes = await routesService.getRoutesByParentId(parentId);
    return {
      msg: "获取路由成功",
      data: routes
    };
  });

  // 新增路由
  static addRoute = asyncHandler(async req => {
    const { name, router, view, level, parentId, isShow } = req.body;
    const result = await routesService.addRoute({
      name,
      router,
      view,
      level,
      parentId,
      isShow
    });
    return {
      msg: "新增路由成功",
      data: null
    };
  });
  // 批量删除路由
  static deleteRoutes = asyncHandler(async req => {
    const { ids } = req.body;
    const result = await routesService.deleteRoutes(ids);
    return {
      msg: "删除路由成功",
      data: null
    };
  });
  // 修改路由
  static updateRoute = asyncHandler(async req => {
    const { id, name, router, view, level, parentId, isShow } = req.body;
    const result = await routesService.updateRoute({
      id,
      name,
      router,
      view,
      level,
      parentId,
      isShow
    });
    return {
      msg: "修改路由成功",
      data: null
    };
  });

  // 查询路由
  static searchRoutes = asyncHandler(async req => {
    const { name, router, view, level, parentId, isShow } = req.body;
    const result = await routesService.searchRoutes({
      name,
      router,
      view,
      level,
      parentId,
      isShow
    });
    return {
      msg: "查询路由成功",
      data: result
    };
  });
}

export default routesController;
