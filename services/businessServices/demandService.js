import demandModel from "../../models/businessModels/demandModel.js";
import CommonUtils from "../../utils/utils.js";

class demandService {
  static async getDemandList(id) {
    let result = await demandModel.getDemandList(id);
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async addDemand({ name, projectId, design, endTime }) {
    let createTime = new Date().toLocaleString();
    endTime = new Date(endTime);
    let result = await demandModel.addDemand({
      name,
      projectId,
      design,
      endTime,
      createTime
    });
    return result;
  }

  static async updateDemand({ id, name, design, endTime, status }) {
    endTime = new Date(endTime);
    let updateTime = new Date();
    let result = await demandModel.updateDemand({
      id,
      name,
      design,
      endTime,
      updateTime,
      status
    });
    return result;
  }
}

export default demandService;
