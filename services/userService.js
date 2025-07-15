import userModel from "../models/userModel.js";
import departmentModel from "../models/departmentModel.js";
import { v4 as uuidv4 } from "uuid";

class userService {
  // 新增用户
  static async addUser({
    username,
    name,
    nikename,
    birth,
    email,
    wechat,
    departmentId,
    phone,
    positionId,
    password,
    frimId,
    isEmp,
  }) {
    // 使用uuid生成唯一id
    let id = uuidv4();
    birth = new Date(birth);
    // 调用userModels的addUser方法
    const user = await userModel.addUser({
      id,
      username,
      name,
      nikename,
      birth,
      email,
      wechat,
      phone,
      departmentId,
      password,
      positionId,
      frimId,
      isEmp,
    });
    return user;
  }

  // 获取用户
  static async getUser({ page, size, username, name, departmentId }) {
    page = Number((page - 1) * size);
    size = Number(size);
    const user = await userModel.getUser({
      page,
      size,
      username,
      name,
      departmentId,
    });
    return user;
  }

  // 修改用户
  static async updateUser({
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
  }) {
    birth = new Date(birth);
    // 查询frimId
    const user = await userModel.updateUser({
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
    });
    return user;
  }

  // 删除用户
  static async deleteUser(id) {
    const user = await userModel.deleteUser(id);
    return user;
  }
  // 根据departmentId查询用户
  static async getUserByDepartmentId(departmentId) {
    const user = await userModel.getUserByDepartmentId(departmentId);
    return user;
  }

  // 根据frimId查询用户
  static async getAllUser(frimId, departmentId, positionId) {
    const user = await userModel.getAllUser({
      frimId,
      departmentId,
      positionId,
    });
    return user;
  }
  static async searchUser({ page, size, username, name, departmentId }) {
    page = Number((page - 1) * size);
    size = Number(size);
    const user = await userModel.searchUser({
      page,
      size,
      username,
      name,
      departmentId,
    });
    return user;
  }
}

export default userService;
