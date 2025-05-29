import express from 'express';
const app = express();
const PORT = 3000;

// 引入路由中间件
import routerlogger from './middlewares/routerLogger.js';
import cors from 'cors';

// 引入路由
import router from './routes/api.js';

// 使用路由中间件
app.use(routerlogger);
app.use(cors()); // 允许所有来源的跨域请求
app.use(express.json({ limit: '50mb' })); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true, limit: '50mb' }));// 解析urlencoded字符串

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`服务运行在: http://localhost:${PORT} `);
})