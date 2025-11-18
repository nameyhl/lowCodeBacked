import takeinModel from "../../models/businessModels/takeinModel.js";
import CommonUtils from "../../utils/utils.js";

class takeinService {
  static async addTakein({ userId, takeinTime, address }) {
    takeinTime = CommonUtils.formatDate(takeinTime);
    let id = new Date().getTime();
    let result = await takeinModel.addTakein({
      id,
      userId,
      takeinTime,
      address
    });
    return result;
  }
  static async getTakeinList({ userId }) {
    let result = await takeinModel.getTakeinList({ userId });
    result = CommonUtils.formatDateInObject(result);
    return result;
  }
}

export default takeinService;
