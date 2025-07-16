import userModel from "../models/userModel.js";
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
    // 验证手机号是否已存在
    const user = await userModel.getUserByPhone(phone);
    if (user.length > 0) {
      const error = new Error("手机号已存在");
      error.status = 400;
      throw error;
    }
    // 调用userModels的addUser方法
    const result = await userModel.addUser({
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
    return result;
  }

  static async login({ phone, password }) {
    // 通过手机号获取用户
    const user = await userModel.getUserByPhone(phone);
    if (user.length === 0) {
      const error = new Error("手机号未注册");
      error.status = 400;
      throw error;
    }
    // 判断密码是否正确
    if (user[0].password !== password) {
      const error = new Error("密码错误");
      error.status = 400;
      throw error;
    }
    return user[0];
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
