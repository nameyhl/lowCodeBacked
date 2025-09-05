import demandModel from "../../models/businessModels/demandModel.js";
import CommonUtils from "../../utils/utils.js";

// 按照status区分需求
function getDemandListByStatus(reslut) {
  let aws = {};
  let statusList = [
    "close",
    "undeveloped",
    "developing",
    "reject",
    "noTest",
    "testing",
    "nopass",
    "pass"
  ];

  statusList.forEach((item, index) => {
    aws[item] = reslut.filter(i => i.status === index);
  });
  return aws;
}

class demandService {
  static async getDemandList(id) {
    let result = await demandModel.getDemandList(id);
    result = CommonUtils.formatDateInObject(result);
    return result;
  }

  static async getDemandListGroupByStatus(id) {
    let result = await demandModel.getDemandList(id);
    result = CommonUtils.formatDateInObject(result);
    return getDemandListByStatus(result);
  }
  static async deleteDemandByProjectId({ id }) {
    await demandModel.deleteDemandByProjectId({ id });
    return;
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
