import { Request, Response } from 'express';
import { BlogService } from '../services/blogService';

export class IndexController {
    public getIndex(req: Request, res: Response): void {
        const featuredPosts = BlogService.getFeaturedPosts().filter(post => post !== undefined);
        const recentPosts = BlogService.getAllPosts().filter(post => post !== undefined).slice(0, 3);
        
        res.render('index', {
            title: '旅行日记 - 探索世界的美好',
            featuredPosts,
            recentPosts
        });
    }

    public getAllPosts(req: Request, res: Response): void {
        const posts = BlogService.getAllPosts().filter(post => post !== undefined);
        console.log('Posts array:', posts);
        console.log('Posts length:', posts.length);
        console.log('Posts elements:', posts.map((p, i) => `${i}: ${p ? 'valid' : 'undefined'}`));
        res.render('posts', {
            title: '所有文章 - 旅行日记',
            posts
        });
    }

    public getPost(req: Request, res: Response): void {
        const postId = req.params.id;
        const post = BlogService.getPostById(postId);
        
        if (!post) {
            return res.status(404).render('404', {
                title: '文章未找到 - 旅行日记'
            });
        }

        res.render('post', {
            title: `${post.title} - 旅行日记`,
            post
        });
    }

    public getDestinations(req: Request, res: Response): void {
        const destinations = BlogService.getAllDestinations().filter(dest => dest !== undefined);
        res.render('destinations', {
            title: '目的地 - 旅行日记',
            destinations
        });
    }

    public getDestination(req: Request, res: Response): void {
        const destinationId = req.params.id;
        const destination = BlogService.getDestinationById(destinationId);
        
        if (!destination) {
            return res.status(404).render('404', {
                title: '目的地未找到 - 旅行日记'
            });
        }

        const posts = BlogService.getPostsByDestination(destination.name).filter(post => post !== undefined);
        res.render('destination', {
            title: `${destination.name} - 旅行日记`,
            destination,
            posts
        });
    }

    public searchPosts(req: Request, res: Response): void {
        const query = req.query.q as string;
        
        if (!query) {
            return res.redirect('/posts');
        }

        const results = BlogService.searchPosts(query).filter(post => post !== undefined);
        res.render('search', {
            title: `搜索结果: "${query}" - 旅行日记`,
            query,
            results
        });
    }
}