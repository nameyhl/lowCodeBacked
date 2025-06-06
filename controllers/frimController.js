import frimService from "../services/frimService.js";
import { asyncHandler } from "../utils/responseHandler.js";


class frimController {
    // 新增分公司
    static addFrim = asyncHandler(async (req, res, next) => {
        const { name, leaderId, msg } = req.body;
        const frim = await frimService.addFrim({ name, leaderId, msg });
        return frim;
    })

    // 获取所有分公司
    static getFrims = asyncHandler(async (req, res, next) => {
        const frims = await frimService.getFrims();
        return frims;
    })

    // 删除分公司
    static deleteFrim = asyncHandler(async (req, res, next) => {
        const { id } = req.body;
        const frim = await frimService.deleteFrim(id);
        return frim;
    })

    // 修改分公司
    static updateFrim = asyncHandler(async (req, res, next) => {
        const { id, name, leaderId, msg } = req.body;
        const frim = await frimService.updateFrim({ id, name, leaderId, msg });
        return frim;
    })
}

export default frimController;  