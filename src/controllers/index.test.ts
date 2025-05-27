import { Request, Response } from 'express';
import { IndexController } from './index';
import { BlogService } from '../services/blogService';

describe('IndexController', () => {
    let controller: IndexController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        controller = new IndexController();
        mockRequest = {};
        mockResponse = {
            render: jest.fn(),
            status: jest.fn().mockReturnThis(),
            redirect: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('getIndex', () => {
        it('should render index page with featured and recent posts', () => {
            const mockFeaturedPosts = [
                { id: '1', title: 'Featured Post', featured: true, publishedAt: new Date() }
            ];
            const mockRecentPosts = [
                { id: '1', title: 'Recent Post 1', publishedAt: new Date() },
                { id: '2', title: 'Recent Post 2', publishedAt: new Date() }
            ];

            const spyFeatured = jest.spyOn(BlogService, 'getFeaturedPosts').mockReturnValue(mockFeaturedPosts as any);
            const spyAll = jest.spyOn(BlogService, 'getAllPosts').mockReturnValue(mockRecentPosts as any);

            controller.getIndex(mockRequest as Request, mockResponse as Response);

            expect(spyFeatured).toHaveBeenCalled();
            expect(spyAll).toHaveBeenCalled();
            expect(mockResponse.render).toHaveBeenCalledWith('index', {
                title: '旅行日记 - 探索世界的美好',
                featuredPosts: mockFeaturedPosts,
                recentPosts: mockRecentPosts.slice(0, 3)
            });
        });
    });

    describe('getAllPosts', () => {
        it('should render posts page with all posts', () => {
            const mockPosts = [
                { id: '1', title: 'Post 1' },
                { id: '2', title: 'Post 2' }
            ];

            const spyAll = jest.spyOn(BlogService, 'getAllPosts').mockReturnValue(mockPosts as any);

            controller.getAllPosts(mockRequest as Request, mockResponse as Response);

            expect(spyAll).toHaveBeenCalled();
            expect(mockResponse.render).toHaveBeenCalledWith('posts', {
                title: '所有文章 - 旅行日记',
                posts: mockPosts
            });
        });
    });

    describe('getPost', () => {
        it('should render post page when post exists', () => {
            const mockPost = { id: '1', title: 'Test Post' };
            mockRequest.params = { id: '1' };
            const spyGet = jest.spyOn(BlogService, 'getPostById').mockReturnValue(mockPost as any);

            controller.getPost(mockRequest as Request, mockResponse as Response);

            expect(spyGet).toHaveBeenCalledWith('1');
            expect(mockResponse.render).toHaveBeenCalledWith('post', {
                title: 'Test Post - 旅行日记',
                post: mockPost
            });
        });

        it('should render 404 page when post does not exist', () => {
            mockRequest.params = { id: '999' };
            const spyGet = jest.spyOn(BlogService, 'getPostById').mockReturnValue(undefined);

            controller.getPost(mockRequest as Request, mockResponse as Response);

            expect(spyGet).toHaveBeenCalledWith('999');
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.render).toHaveBeenCalledWith('404', {
                title: '文章未找到 - 旅行日记'
            });
        });
    });

    describe('getDestinations', () => {
        it('should render destinations page with all destinations', () => {
            const mockDestinations = [
                { id: '1', name: 'Destination 1' },
                { id: '2', name: 'Destination 2' }
            ];

            const spyAll = jest.spyOn(BlogService, 'getAllDestinations').mockReturnValue(mockDestinations as any);

            controller.getDestinations(mockRequest as Request, mockResponse as Response);

            expect(spyAll).toHaveBeenCalled();
            expect(mockResponse.render).toHaveBeenCalledWith('destinations', {
                title: '目的地 - 旅行日记',
                destinations: mockDestinations
            });
        });
    });

    describe('getDestination', () => {
        it('should render destination page when destination exists', () => {
            const mockDestination = { id: '1', name: 'Test Destination' };
            const mockPosts = [{ id: '1', title: 'Post about destination' }];
            mockRequest.params = { id: '1' };
            const spyGet = jest.spyOn(BlogService, 'getDestinationById').mockReturnValue(mockDestination as any);
            const spyPosts = jest.spyOn(BlogService, 'getPostsByDestination').mockReturnValue(mockPosts as any);

            controller.getDestination(mockRequest as Request, mockResponse as Response);

            expect(spyGet).toHaveBeenCalledWith('1');
            expect(spyPosts).toHaveBeenCalledWith('Test Destination');
            expect(mockResponse.render).toHaveBeenCalledWith('destination', {
                title: 'Test Destination - 旅行日记',
                destination: mockDestination,
                posts: mockPosts
            });
        });

        it('should render 404 page when destination does not exist', () => {
            mockRequest.params = { id: '999' };
            const spyGet = jest.spyOn(BlogService, 'getDestinationById').mockReturnValue(undefined);

            controller.getDestination(mockRequest as Request, mockResponse as Response);

            expect(spyGet).toHaveBeenCalledWith('999');
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.render).toHaveBeenCalledWith('404', {
                title: '目的地未找到 - 旅行日记'
            });
        });
    });

    describe('searchPosts', () => {
        it('should render search results when query is provided', () => {
            const mockResults = [{ id: '1', title: 'Search Result' }];
            mockRequest.query = { q: 'test query' };
            const spySearch = jest.spyOn(BlogService, 'searchPosts').mockReturnValue(mockResults as any);

            controller.searchPosts(mockRequest as Request, mockResponse as Response);

            expect(spySearch).toHaveBeenCalledWith('test query');
            expect(mockResponse.render).toHaveBeenCalledWith('search', {
                title: '搜索结果: "test query" - 旅行日记',
                query: 'test query',
                results: mockResults
            });
        });

        it('should redirect to posts page when no query is provided', () => {
            mockRequest.query = {};

            controller.searchPosts(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.redirect).toHaveBeenCalledWith('/posts');
        });
    });
});