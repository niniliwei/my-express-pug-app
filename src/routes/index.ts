import { Router } from 'express';
import { IndexController } from '../controllers';

const router = Router();
const indexController = new IndexController();

export const setRoutes = (app: any) => {
    app.use('/', router);
    
    // 首页
    router.get('/', indexController.getIndex.bind(indexController));
    
    // 博客文章路由
    router.get('/posts', indexController.getAllPosts.bind(indexController));
    router.get('/posts/:id', indexController.getPost.bind(indexController));
    
    // 目的地路由
    router.get('/destinations', indexController.getDestinations.bind(indexController));
    router.get('/destinations/:id', indexController.getDestination.bind(indexController));
    
    // 搜索路由
    router.get('/search', indexController.searchPosts.bind(indexController));
};