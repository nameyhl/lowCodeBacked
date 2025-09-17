import takeinModel from "../../models/businessModels/takeinModel.js";
import CommonUtils from "../../utils/utils.js";

class takeinService {
  static async addTakein({ userId, takeinTime }) {
    takeinTime = CommonUtils.formatDate(takeinTime);
    let id = new Date().getTime();
    let result = await takeinModel.addTakein({ id, userId, takeinTime });
    return result;
  }
}

export default takeinService;
