import mysql from "mysql2/promise";

// 创建基础连接池
const basePool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "lowCode",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 包装query方法以添加日志
const pool = {
  async query(sql, params) {
    console.log(`[SQL执行] ${sql}`);
    if (params) console.log(`[参数] ${JSON.stringify(params)}`);
    return basePool.query(sql, params);
  },
  async execute(sql, params) {
    console.log(`[SQL执行] ${sql}`);
    if (params) console.log(`[参数] ${JSON.stringify(params)}`);
    return basePool.execute(sql, params);
  },
  async beginTransaction() {
    console.log("[事务] 开始事务");
    const conn = await basePool.getConnection();
    await conn.beginTransaction();
    return {
      commit: async () => {
        console.log("[事务] 提交事务");
        await conn.commit();
        conn.release();
      },
      rollback: async () => {
        console.log("[事务] 回滚事务");
        await conn.rollback();
        conn.release();
      },
      query: async function (sql, params) {
        console.log(`[事务SQL执行] ${sql}`);
        if (params) console.log(`[事务参数] ${JSON.stringify(params)}`);
        return conn.query(sql, params);
      },
      execute: async function (sql, params) {
        console.log(`[事务SQL执行] ${sql}`);
        if (params) console.log(`[事务参数] ${JSON.stringify(params)}`);
        return conn.execute(sql, params);
      },
    };
  },
  getConnection: basePool.getConnection.bind(basePool),
  end: basePool.end.bind(basePool),
};

export default pool;
