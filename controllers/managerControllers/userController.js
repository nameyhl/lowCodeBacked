import userService from "../../services/managerServices/userService.js";
import { asyncHandler } from "../../utils/responseHandler.js";

class userController {
  // 新增用户
  static addUser = asyncHandler(async req => {
    const {
      username,
      name,
      nikename,
      birth,
      email,
      wechat,
      departmentId,
      password,
      positionId,
      phone,
      frimId,
      isEmp,
      avatar
    } = req.body;
    const result = await userService.addUser({
      username,
      name,
      nikename,
      birth,
      phone,
      email,
      wechat,
      departmentId,
      password,
      positionId,
      frimId,
      isEmp,
      avatar
    });
    return result;
  });
  static login = asyncHandler(async req => {
    const { phone, password } = req.body;
    const result = await userService.login({ phone, password });
    return {
      msg: "登录成功",
      data: result
    };
  });
  // 查询用户
  static getUser = asyncHandler(async req => {
    let { page, size, username, name, departmentId } = req.query;
    const result = await userService.getUser({
      page,
      size,
      username,
      name,
      departmentId
    });
    return {
      msg: "查询用户成功",
      data: result
    };
  });

  // 修改用户
  static updateUser = asyncHandler(async req => {
    const {
      id,
      username,
      name,
      nikename,
      birth,
      email,
      wechat,
      departmentId,
      phone,
      positionId,
      frimId,
      avatar
    } = req.body;
    const result = await userService.updateUser({
      id,
      username,
      name,
      nikename,
      birth,
      email,
      wechat,
      departmentId,
      phone,
      positionId,
      frimId,
      avatar
    });
    return {
      msg: "修改用户成功",
      data: null
    };
  });
  // 删除用户
  static deleteUser = asyncHandler(async req => {
    const { id } = req.query;
    const result = await userService.deleteUser(id);
    return {
      msg: "删除用户成功",
      data: null
    };
  });
  // 根据departmentId查询用户
  static getUserByDepartmentId = asyncHandler(async req => {
    const { departmentId } = req.query;
    const result = await userService.getUserByDepartmentId(departmentId);
    return {
      msg: "根据departmentId查询用户成功",
      data: result
    };
  });

  // 根据frimId查询用户
  static getAllUser = asyncHandler(async req => {
    const { frimId, departmentId, positionId } = req.query;
    const result = await userService.getAllUser(
      frimId,
      departmentId,
      positionId
    );
    return {
      msg: "根据frimId查询用户成功",
      data: result
    };
  });

  // 查询用户
  static searchUser = asyncHandler(async req => {
    const { page, size, username, name, departmentId } = req.body;
    const result = await userService.searchUser({
      page,
      size,
      username,
      name,
      departmentId
    });
    return {
      msg: "查询用户成功",
      data: result
    };
  });
}

export default userController;
