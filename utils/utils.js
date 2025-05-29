// 工具类方法


class CommonUtils {
  static buildTree(items, parentId = '') {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => {
        const children = this.buildTree(items, item.id).map(child => ({
          ...child,
          parentRouter: item.router // 将父节点的 router 属性放入子节点
        }));
        return {
          ...item,
          children
        };
      });
  }
}
export default CommonUtils;