import departmentModel from "../models/departmentModel.js";

class departmentService {
  // 新增部门
  static async addDepartment({ name, frimId, leaderId, msg }) {
    let id = new Date().getTime();
    if (!leaderId) leaderId = null;
    if (!frimId) frimId = null;
    if (!msg) msg = null;
    console.log(name, frimId, leaderId, msg);
    await departmentModel.addDepartment({ id, name, frimId, leaderId, msg });
    return "新增成功";
  }
  //  获取部门列表
  static async getDepartment() {
    const department = await departmentModel.getDepartment();
    return department;
  }
  //  修改部门信息
  static async updateDepartment({ id, name, frimId, leaderId, msg }) {
    console.log(id, name, frimId, leaderId, msg);
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
    const department = await departmentModel.deleteDepartment(id);
    return department;
  }
}

export default departmentService;
