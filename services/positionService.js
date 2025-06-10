import positionModel from "../models/positionmodel.js";

class positionService {
    static async addPosition({ name, departmentId, leaderId }) {
        // 事件搓生成id
        let id = Date.now().toString()
        const result = await positionModel.addPosition({ id, name, departmentId, leaderId });
        return result;
    }
}

export default positionService;