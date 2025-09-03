import frimService from "../../services/managerServices/frimService.js";
import { asyncHandler } from "../../utils/responseHandler.js";

class frimController {
  // 新增分公司
  static addFrim = asyncHandler(async (req, res, next) => {
    const { name, msg } = req.body;
    const frim = await frimService.addFrim({ name, msg });
    return {
      msg: "新增分公司成功",
      data: null
    };
  });

  // 获取所有分公司
  static getFrims = asyncHandler(async (req, res, next) => {
    const { page, size } = req.query;
    const frims = await frimService.getFrims({ page, size });
    return {
      msg: "获取分公司成功",
      data: frims
    };
  });

  // 删除分公司
  static deleteFrim = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const frim = await frimService.deleteFrim(id);
    return {
      msg: "删除分公司成功",
      data: null
    };
  });

  // 修改分公司
  static updateFrim = asyncHandler(async (req, res, next) => {
    const { id, name, leaderId, msg } = req.body;
    const frim = await frimService.updateFrim({ id, name, leaderId, msg });
    return {
      msg: "修改分公司成功",
      data: null
    };
  });
}

export default frimController;
