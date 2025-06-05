import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";


class userService {
    // 新增用户
    static async addUser({ username, password, role }) {
        // 使用uuid生成唯一id
        let id = uuidv4();
        // 调用userModels的addUser方法
        const user = await userModel.addUser({id, username, password, role });
        return user;
    }
}

export default userService;