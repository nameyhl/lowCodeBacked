// 工具类方法


class CommonUtils {
  static buildTree(items, parentId = null) {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: this.buildTree(items, item.id)
      }));
  }
}
export default CommonUtils;