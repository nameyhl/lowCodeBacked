import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";


class userService {
    // 新增用户
    static async addUser({username, name, nikename, birth, 
        email , wechat, departmentId, phone, password}) {
        // 使用uuid生成唯一id
        let id = uuidv4();
        // 如果没有传password，默认密码为123456
        if (!password) {
            password = "123456";
        }
        birth = new Date(birth);
        // 调用userModels的addUser方法
        const user = await userModel.addUser({id, username, name, nikename, birth, 
            email , wechat, phone, departmentId, password});
        return user;
    }

    // 获取用户
    static async getUser() {
        const user = await userModel.getUser();
        return user;
    }

    // 修改用户
    static async updateUser({id, username, name, nikename, birth, email, wechat, departmentId, phone}) {
        birth = new Date(birth);
        const user = await userModel.updateUser({id, username, name, nikename, birth, email, wechat, departmentId, phone});
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
    static async getUserByFrimId(frimId) {
        const user = await userModel.getUserByFrimId(frimId);
        return user;
    }
}

export default userService;