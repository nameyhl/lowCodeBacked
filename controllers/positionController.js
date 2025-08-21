import positionService from "../services/positionService.js";
import { asyncHandler } from "../utils/responseHandler.js";

class positionController {
  static addPosition = asyncHandler(async (req, res) => {
    const { name, departmentId, msg, frimId } = req.body;
    const result = await positionService.addPosition({
      name,
      departmentId,
      msg,
      frimId
    });
    return { message: "新增职位成功", data: null };
  });

  static getPosition = asyncHandler(async (req, res) => {
    let { departmentId, name, page, size } = req.query;
    const result = await positionService.getPositions({
      departmentId,
      name,
      page,
      size
    });
    return {
      msg: "获取职位成功",
      data: result
    };
  });

  static deletePosition = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const result = await positionService.deletePosition(id);
    return result;
  });
  static updatePosition = asyncHandler(async (req, res) => {
    const { id, name, leaderId, msg } = req.body;
    const result = await positionService.updatePosition({
      id,
      name,
      leaderId,
      msg
    });
    return {
      msg: "修改职位成功",
      data: null
    };
  });
}

export default positionController;
