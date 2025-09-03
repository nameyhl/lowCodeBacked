import frimModel from "../../models/managerModels/frimModel.js";
import departmentModel from "../../models/managerModels/departmentModel.js";

class frimService {
  // 新增分公司
  static async addFrim({ name, msg }) {
    let id = new Date().getTime();
    const frim = await frimModel.addFrim({ id, name, msg });
    return frim;
  }

  // 获取所有分公司
  static async getFrims({ page, size }) {
    if (page && size) {
      page = Number((page - 1) * size);
      size = Number(size);
      const frims = await frimModel.getFrims({ page, size });
      return frims;
    } else {
      const frims = await frimModel.getAllFrims();
      return frims;
    }
  }

  // 删除分公司
  static async deleteFrim(id) {
    const department = await departmentModel.getAllDepartment({ frimId: id });
    if (department.length > 0) {
      const error = new Error("该分公司下仍然存在部门，请清空后再删除");
      error.status = 400;
      throw error;
    }
    const frim = await frimModel.deleteFrim(id);
    return frim;
  }

  // 修改分公司
  static async updateFrim({ id, name, leaderId, msg }) {
    if (leaderId === "") leaderId = null;
    const frim = await frimModel.updateFrim({ id, name, leaderId, msg });
    return frim;
  }
}

export default frimService;
