import userService from "../services/userService.js";
import { asyncHandler } from "../utils/responseHandler.js";

class userController {
    // 新增用户
    static addUser = asyncHandler(async (req) => {
        const {username, name, nikename, birth, 
            email , wechat, departmentId, password, phone} = req.body;
        const result = await userService.addUser({username, name, nikename, birth, phone,
            email , wechat, departmentId, password});
        return result;
    })
    // 查询用户
    static getUser = asyncHandler(async (req) => {
        const result = await userService.getUser();
        return result;
    })

    // 修改用户
    static updateUser = asyncHandler(async (req) => {
        const {id, username, name, nikename, birth, email, wechat, departmentId, phone} = req.body;
        const result = await userService.updateUser({id, username, name, nikename, birth, email, wechat, departmentId, phone});
        return result;
    })
    // 删除用户
    static deleteUser = asyncHandler(async (req) => {
        const {id} = req.query;
        const result = await userService.deleteUser(id);
        return result;
    })
    // 根据departmentId查询用户
    static getUserByDepartmentId = asyncHandler(async (req) => {
        const {departmentId} = req.query;
        const result = await userService.getUserByDepartmentId(departmentId);
        return result;
    })

    // 根据frimId查询用户
    static getUserByFrimId = asyncHandler(async (req) => {
        const {frimId} = req.query;
        const result = await userService.getUserByFrimId(frimId);
        return result;
    })
}

export default userController;