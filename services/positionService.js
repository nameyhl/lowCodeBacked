import positionModel from "../models/positionmodel.js";

class positionService {
    static async addPosition({ name, departmentId, msg, frimId }) {
        // 事件搓生成id
        let id = Date.now().toString()
        const result = await positionModel.addPosition({ id, name, departmentId, msg, frimId });
        return result;
    }

    static async getPositions({ departmentId, name, page, size }) {
        if (page && size) {
            page = Number((page - 1) * size);
            size = Number(size);
            const result = await positionModel.getPositions({ departmentId, name, page, size });
            return result;
        } else {
            const result = await positionModel.getALlPosition({ departmentId });
            return result;
        }

    }

    static async deletePosition(id) {
        const result = await positionModel.deletePosition(id);
        return result;
    }
}

export default positionService;