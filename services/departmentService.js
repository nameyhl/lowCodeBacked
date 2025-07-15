import departmentModel from "../models/departmentModel.js";
import positionModel from "../models/positionModel.js";

class departmentService {
  // 新增部门
  static async addDepartment({ name, frimId, leaderId, msg }) {
    let id = new Date().getTime();
    if (!leaderId) leaderId = null;
    if (!frimId) frimId = null;
    if (!msg) msg = null;
    await departmentModel.addDepartment({ id, name, frimId, leaderId, msg });
    return "新增成功";
  }
  //  获取部门列表
  static async getDepartment({ name, frimId, page, size }) {
    if (page && size) {
      page = Number((page - 1) * size);
      size = Number(size);
      const department = await departmentModel.getDepartment({
        name,
        frimId,
        page,
        size,
      });
      return department;
    } else {
      const department = await departmentModel.getAllDepartment({
        name,
        frimId,
      });
      return department;
    }
  }
  //  修改部门信息
  static async updateDepartment({ id, name, frimId, leaderId, msg }) {
    if (leaderId === "") leaderId = null;
    const department = await departmentModel.updateDepartment({
      id,
      name,
      frimId,
      leaderId,
      msg,
    });
    return department;
  }
  // 删除部门
  static async deleteDepartment(id) {
    const position = await positionModel.getALlPosition({ departmentId: id });
    if (position.length > 0) {
      const error = new Error("该部门下仍然存在岗位，请清空后再删除");
      error.status = 400;
      throw error;
    }
    const department = await departmentModel.deleteDepartment(id);
    return department;
  }
}

export default departmentService;
