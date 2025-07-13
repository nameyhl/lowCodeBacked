import positionModel from "../models/positionmodel.js";

class positionService {
    static async addPosition({ name, departmentId, leaderId }) {
        // 事件搓生成id
        let id = Date.now().toString()
        const result = await positionModel.addPosition({ id, name, departmentId, leaderId });
        return result;
    }

    static async getPositions() {
        const result = await positionModel.getPositions();
        const total = await positionModel.getPositionsTotal();
        return {
            data: result,
            total: total
        };
    }

    static async deletePosition(id) {
        const result = await positionModel.deletePosition(id);
        return result;
    }
}

export default positionService;