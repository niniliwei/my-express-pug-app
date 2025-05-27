import express from 'express';
import path from 'path';
import { setRoutes } from './routes/index';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 设置 Pug 作为视图引擎
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 使用中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置路由
setRoutes(app);

// 404 处理
app.use((req, res) => {
    res.status(404).render('404', {
        title: '页面未找到 - 旅行日记'
    });
});

// 错误处理中间件
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('服务器内部错误');
});

// 只在非测试环境中启动服务器
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;