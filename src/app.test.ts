import request from 'supertest';
import app from './app';

describe('Travel Blog App Integration Tests', () => {
    describe('GET /', () => {
        it('should render the homepage with featured posts', async () => {
            const response = await request(app)
                .get('/')
                .expect(200)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('旅行日记');
            expect(response.text).toContain('精选文章');
        });
    });

    describe('GET /posts', () => {
        it('should render all posts page', async () => {
            const response = await request(app)
                .get('/posts')
                .expect(200)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('所有文章');
            expect(response.text).toContain('京都');
        });
    });

    describe('GET /posts/1', () => {
        it('should render specific post page', async () => {
            const response = await request(app)
                .get('/posts/1')
                .expect(200)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('在京都探索古老的寺庙');
            expect(response.text).toContain('京都是日本的古都');
        });
    });

    describe('GET /posts/999', () => {
        it('should return 404 for non-existent post', async () => {
            const response = await request(app)
                .get('/posts/999')
                .expect(404)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('页面未找到');
        });
    });

    describe('GET /destinations', () => {
        it('should render destinations page', async () => {
            const response = await request(app)
                .get('/destinations')
                .expect(200)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('热门目的地');
            expect(response.text).toContain('京都');
            expect(response.text).toContain('巴黎');
        });
    });

    describe('GET /destinations/1', () => {
        it('should render specific destination page', async () => {
            const response = await request(app)
                .get('/destinations/1')
                .expect(200)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('京都');
            expect(response.text).toContain('日本');
        });
    });

    describe('GET /search', () => {
        it('should perform search and return results', async () => {
            const response = await request(app)
                .get('/search?q=京都')
                .expect(200)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('搜索结果');
            expect(response.text).toContain('京都');
        });

        it('should redirect to posts when no query provided', async () => {
            const response = await request(app)
                .get('/search')
                .expect(302);

            expect(response.headers.location).toBe('/posts');
        });

        it('should handle empty search results', async () => {
            const response = await request(app)
                .get('/search?q=不存在的内容')
                .expect(200)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('没有找到');
        });
    });

    describe('Error handling', () => {
        it('should return 404 for non-existent pages', async () => {
            const response = await request(app)
                .get('/non-existent-page')
                .expect(404)
                .expect('Content-Type', /text\/html/);

            expect(response.text).toContain('页面未找到');
        });
    });

    describe('Static content and navigation', () => {
        it('should include navigation in all pages', async () => {
            const pages = ['/', '/posts', '/destinations'];
            
            for (const page of pages) {
                const response = await request(app)
                    .get(page)
                    .expect(200);

                expect(response.text).toContain('首页');
                expect(response.text).toContain('所有文章');
                expect(response.text).toContain('目的地');
                expect(response.text).toContain('搜索');
            }
        });

        it('should include proper page titles', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            expect(response.text).toContain('<title>旅行日记 - 探索世界的美好</title>');
        });
    });
});