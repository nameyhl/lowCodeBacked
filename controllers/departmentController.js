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
      msg
    });
    return {
      msg: "新增部门成功",
      data: null
    };
  });

  // 获取部门列表
  static getDepartment = asyncHandler(async (req, res, next) => {
    const { name, frimId, page, size } = req.query;
    const department = await departmentService.getDepartment({
      name,
      frimId,
      page,
      size
    });
    return {
      msg: "获取部门成功",
      data: department
    };
  });
  // 修改部门信息
  static updateDepartment = asyncHandler(async (req, res, next) => {
    const { id, name, frimId, leaderId, msg } = req.body;
    const department = await departmentService.updateDepartment({
      id,
      name,
      frimId,
      leaderId,
      msg
    });
    return {
      msg: "修改部门成功",
      data: null
    };
  });
  // 删除部门信息
  static deleteDepartment = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const department = await departmentService.deleteDepartment(id);
    return {
      msg: "删除部门成功",
      data: null
    };
  });
}

export default departmentController;
