import userService from "../services/userService.js";
import { asyncHandler } from "../utils/responseHandler.js";

class userController {
    // 新增用户
    static addUser = asyncHandler(async (req) => {
        const { username, password, role } = req.body;
        const result = await userService.addUser({ username, password, role });
        return result;
    })
}

export default userController;