/**
 * 成功响应
 * @param {*} data 返回的数据
 * @param {string} msg 成功消息
 * @returns {object} 标准成功响应对象
 */
export const successResponse = (data = null, msg = '操作成功') => {
  return {
    status: 200,
    msg,
    data
  };
};

/**
 * 错误响应
 * @param {number} status 错误状态码
 * @param {string} msg 错误消息
 * @param {*} error 错误对象（可选，用于开发调试）
 * @returns {object} 标准错误响应对象
 */
export const errorResponse = (status = 500, msg = '服务器错误', error = null) => {
  const response = {
    status,
    msg
  };
  console.error(error);
  // 只在开发环境下返回错误详情
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = error.message || error;
  }
  return response;
};

/**
 * 包装异步函数，自动处理错误
 * @param {Function} handler 控制器函数
 * @returns {Function} 包装后的中间件函数
 */
export const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.json(successResponse(result));
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || '服务器错误';
      res.status(status).json(errorResponse(status, message, error));
    }
  };
};