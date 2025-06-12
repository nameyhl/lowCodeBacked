import departmentService from "../services/departmentService.js";
import { asyncHandler } from "../utils/responseHandler.js";

class departmentController {
  // 新增部门
  static addDepartment = asyncHandler(async (req, res, next) => {
    const { name, frimId, leaderId, msg } = req.body;
    const department = await departmentService.addDepartment({
      name,
      frimId,
      leaderId,
      msg,
    });
    return department;
  });

  // 获取部门列表
  static getDepartment = asyncHandler(async (req, res, next) => {
    const department = await departmentService.getDepartment();
    return department;
  });
  // 修改部门信息
  static updateDepartment = asyncHandler(async (req, res, next) => {
    const { id, name, frimId, leaderId, msg } = req.body;
    const department = await departmentService.updateDepartment({
      id,
      name,
      frimId,
      leaderId,
      msg,
    });
    return department;
  });
  // 删除部门信息
  static deleteDepartment = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const department = await departmentService.deleteDepartment(id);
    return department;
  });
}

export default departmentController;
