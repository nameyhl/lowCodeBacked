// middleware/routeLogger.js

/**
 * 路由日志中间件
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - 下一个中间件函数
 */
const routeLogger = (req, res, next) => {
  const method = req.method;
  const path = req.path;
  const timestamp = new Date().toLocaleString();
  // 访问ip
  const ip = req.ip;

  console.log(`(${ip})   [${timestamp}] 方法： ${method} 访问路径： ${path}`);

  // 新增SQL日志监听
  const originalQuery = res.query;
  res.query = function (sql, params) {
    console.log(`[SQL] ${sql}`);
    if (params) console.log(`[参数] ${JSON.stringify(params)}`);
    return originalQuery.apply(this, arguments);
  };

  // 新增事务日志
  const originalCommit = res.commit;
  const originalRollback = res.rollback;
  res.commit = function () {
    console.log("[事务] 提交");
    return originalCommit.apply(this, arguments);
  };
  res.rollback = function () {
    console.log("[事务] 回滚");
    return originalRollback.apply(this, arguments);
  };

  next();
};

export default routeLogger;
