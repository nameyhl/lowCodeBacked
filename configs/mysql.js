import mysql from 'mysql2/promise';

// 创建基础连接池
const basePool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'lowCode',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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
  getConnection: basePool.getConnection.bind(basePool),
  end: basePool.end.bind(basePool)
};

export default pool;