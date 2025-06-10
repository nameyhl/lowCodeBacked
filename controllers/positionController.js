import positionService from "../services/positionService.js";
import { asyncHandler } from "../utils/responseHandler.js";


class positionController {
    static addPosition = asyncHandler(async (req, res) => {
        const { name, departmentId, leaderId } = req.body;
        const result = await positionService.addPosition({ name, departmentId, leaderId });
        return { message: "新增职位成功", result };
    })
}

export default positionController;