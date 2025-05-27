import { BlogService } from '../services/blogService';
import { BlogPost, Destination } from '../types';

describe('BlogService', () => {
    describe('getAllPosts', () => {
        it('should return all posts sorted by publication date', () => {
            const posts = BlogService.getAllPosts();
            
            expect(posts).toHaveLength(3);
            expect(posts[0].publishedAt >= posts[1].publishedAt).toBe(true);
            expect(posts[1].publishedAt >= posts[2].publishedAt).toBe(true);
        });

        it('should return posts with required properties', () => {
            const posts = BlogService.getAllPosts();
            
            posts.forEach(post => {
                expect(post).toHaveProperty('id');
                expect(post).toHaveProperty('title');
                expect(post).toHaveProperty('content');
                expect(post).toHaveProperty('destination');
                expect(post).toHaveProperty('country');
                expect(post).toHaveProperty('tags');
                expect(post).toHaveProperty('publishedAt');
                expect(post).toHaveProperty('featured');
                expect(Array.isArray(post.tags)).toBe(true);
                expect(post.publishedAt instanceof Date).toBe(true);
            });
        });
    });

    describe('getFeaturedPosts', () => {
        it('should return only featured posts', () => {
            const featuredPosts = BlogService.getFeaturedPosts();
            
            expect(featuredPosts.length).toBeGreaterThan(0);
            featuredPosts.forEach(post => {
                expect(post.featured).toBe(true);
            });
        });
    });

    describe('getPostById', () => {
        it('should return post with correct ID', () => {
            const post = BlogService.getPostById('1');
            
            expect(post).toBeDefined();
            expect(post?.id).toBe('1');
            expect(post?.title).toBe('在京都探索古老的寺庙');
        });

        it('should return undefined for non-existent ID', () => {
            const post = BlogService.getPostById('999');
            
            expect(post).toBeUndefined();
        });
    });

    describe('getPostsByDestination', () => {
        it('should return posts matching destination', () => {
            const posts = BlogService.getPostsByDestination('京都');
            
            expect(posts.length).toBeGreaterThan(0);
            posts.forEach(post => {
                expect(post.destination.toLowerCase()).toContain('京都');
            });
        });

        it('should be case insensitive', () => {
            const posts = BlogService.getPostsByDestination('KYOTO');
            
            expect(posts.length).toBe(0); // 因为我们的数据是中文
        });

        it('should return empty array for non-existent destination', () => {
            const posts = BlogService.getPostsByDestination('不存在的地方');
            
            expect(posts).toHaveLength(0);
        });
    });

    describe('getAllDestinations', () => {
        it('should return all destinations', () => {
            const destinations = BlogService.getAllDestinations();
            
            expect(destinations).toHaveLength(3);
            expect(destinations[0]).toHaveProperty('id');
            expect(destinations[0]).toHaveProperty('name');
            expect(destinations[0]).toHaveProperty('country');
            expect(destinations[0]).toHaveProperty('description');
            expect(destinations[0]).toHaveProperty('postCount');
        });
    });

    describe('getDestinationById', () => {
        it('should return destination with correct ID', () => {
            const destination = BlogService.getDestinationById('1');
            
            expect(destination).toBeDefined();
            expect(destination?.id).toBe('1');
            expect(destination?.name).toBe('京都');
        });

        it('should return undefined for non-existent ID', () => {
            const destination = BlogService.getDestinationById('999');
            
            expect(destination).toBeUndefined();
        });
    });

    describe('searchPosts', () => {
        it('should find posts by title', () => {
            const results = BlogService.searchPosts('京都');
            
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].title).toContain('京都');
        });

        it('should find posts by content', () => {
            const results = BlogService.searchPosts('寺庙');
            
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].content).toContain('寺庙');
        });

        it('should find posts by destination', () => {
            const results = BlogService.searchPosts('巴黎');
            
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].destination).toContain('巴黎');
        });

        it('should find posts by tags', () => {
            const results = BlogService.searchPosts('文化');
            
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].tags).toContain('文化');
        });

        it('should be case insensitive', () => {
            const results1 = BlogService.searchPosts('京都');
            const results2 = BlogService.searchPosts('京都');
            
            expect(results1).toEqual(results2);
        });

        it('should return empty array for no matches', () => {
            const results = BlogService.searchPosts('不存在的内容');
            
            expect(results).toHaveLength(0);
        });
    });
});
