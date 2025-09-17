import takeinService from "../../services/businessServices/takeinService.js";

class takeinController {
  static async addTakein(req, res) {
    let { userId, takeinTime } = req.body;
    let result = await takeinService.addTakein({ userId, takeinTime });
    res.json({
      data: null,
      msg: "新增成功"
    });
  }
}
export default takeinController;
