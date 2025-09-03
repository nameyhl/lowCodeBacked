import positionModel from "../../models/managerModels/positionmodel.js";
import userModel from "../../models/managerModels/userModel.js";

class positionService {
  static async addPosition({ name, departmentId, msg, frimId }) {
    // 事件搓生成id
    let id = Date.now().toString();
    const result = await positionModel.addPosition({
      id,
      name,
      departmentId,
      msg,
      frimId
    });
    return result;
  }

  static async getPositions({ departmentId, name, page, size }) {
    if (page && size) {
      page = Number((page - 1) * size);
      size = Number(size);
      const result = await positionModel.getPositions({
        departmentId,
        name,
        page,
        size
      });
      return result;
    } else {
      const result = await positionModel.getALlPosition({ departmentId });
      return result;
    }
  }

  static async deletePosition(id) {
    const user = await userModel.getAllUser({ positionId: id });
    if (user.length > 0) {
      const error = new Error("该部门下仍然存在用户，请清空后再删除");
      error.status = 400;
      throw error;
    }
    const result = await positionModel.deletePosition(id);
    return result;
  }

  static async updatePosition({ id, name, leaderId, msg }) {
    const result = await positionModel.updatePosition({
      id,
      name,
      leaderId,
      msg
    });
    return result;
  }
}

export default positionService;
