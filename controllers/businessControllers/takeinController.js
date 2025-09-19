import takeinService from "../../services/businessServices/takeinService.js";
import { asyncHandler } from "../../utils/responseHandler.js";

class takeinController {
  static addTakein = asyncHandler(async (req, res) => {
    let { userId, takeinTime, address } = req.body;
    let result = await takeinService.addTakein({ userId, takeinTime, address });
    return {
      data: null,
      msg: "新增成功"
    };
  });

  static getTakeinList = asyncHandler(async (req, res) => {
    let { userId } = req.query;
    let result = await takeinService.getTakeinList({ userId });
    return {
      data: result,
      msg: "查询成功"
    };
  });
}
export default takeinController;
