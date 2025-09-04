import demandService from "../../services/businessServices/demandService.js";
import { asyncHandler } from "../../utils/responseHandler.js";

class demandController {
  static getDemandList = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const result = await demandService.getDemandList(id);
    return {
      msg: "获取需求列表成功",
      data: result
    };
  });

  static addDemand = asyncHandler(async (req, res) => {
    const { name, projectId, design, endTime } = req.body;
    const result = await demandService.addDemand({
      name,
      projectId,
      design,
      endTime
    });
    return {
      msg: "添加需求成功",
      data: null
    };
  });

  static updateDemand = asyncHandler(async (req, res) => {
    const { id, name, design, endTime, status } = req.body;
    await demandService.updateDemand({
      id,
      name,
      design,
      endTime,
      status
    });
    return {
      msg: "更新需求成功",
      data: null
    };
  });
}

export default demandController;
