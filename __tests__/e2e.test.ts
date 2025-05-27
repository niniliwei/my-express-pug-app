import request from 'supertest';
import app from '../src/app';

describe('Travel Blog E2E Tests', () => {
    describe('User journey: Browsing the travel blog', () => {
        it('should allow user to navigate through the entire blog', async () => {
            // Step 1: Visit homepage
            const homepageResponse = await request(app)
                .get('/')
                .expect(200);
            
            expect(homepageResponse.text).toContain('旅行日记');
            expect(homepageResponse.text).toContain('精选文章');
            
            // Step 2: Click on all posts
            const postsResponse = await request(app)
                .get('/posts')
                .expect(200);
            
            expect(postsResponse.text).toContain('所有文章');
            
            // Step 3: Read a specific post
            const postResponse = await request(app)
                .get('/posts/1')
                .expect(200);
            
            expect(postResponse.text).toContain('在京都探索古老的寺庙');
            
            // Step 4: Browse destinations
            const destinationsResponse = await request(app)
                .get('/destinations')
                .expect(200);
            
            expect(destinationsResponse.text).toContain('热门目的地');
            
            // Step 5: View a specific destination
            const destinationResponse = await request(app)
                .get('/destinations/1')
                .expect(200);
            
            expect(destinationResponse.text).toContain('京都');
        });

        it('should handle search functionality correctly', async () => {
            // Search for existing content
            const searchResponse = await request(app)
                .get('/search?q=京都')
                .expect(200);
            
            expect(searchResponse.text).toContain('搜索结果');
            expect(searchResponse.text).toContain('京都');
            
            // Search for non-existing content
            const noResultsResponse = await request(app)
                .get('/search?q=不存在的地方')
                .expect(200);
            
            expect(noResultsResponse.text).toContain('没有找到');
        });

        it('should handle error cases gracefully', async () => {
            // Test 404 for non-existent post
            await request(app)
                .get('/posts/999')
                .expect(404);
            
            // Test 404 for non-existent destination
            await request(app)
                .get('/destinations/999')
                .expect(404);
            
            // Test 404 for non-existent page
            await request(app)
                .get('/non-existent-page')
                .expect(404);
        });
    });

    describe('Content validation', () => {
        it('should display correct content structure on homepage', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
            
            // Check for required elements
            expect(response.text).toContain('旅行日记');
            expect(response.text).toContain('发现世界的美好');
            expect(response.text).toContain('首页');
            expect(response.text).toContain('所有文章');
            expect(response.text).toContain('目的地');
            expect(response.text).toContain('搜索');
        });

        it('should display travel-related content', async () => {
            const response = await request(app)
                .get('/posts/1')
                .expect(200);
            
            // Check for travel blog content
            expect(response.text).toContain('京都');
            expect(response.text).toContain('日本');
            expect(response.text).toContain('寺庙');
            expect(response.text).toContain('文化');
        });

        it('should have proper meta information', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
            
            expect(response.text).toContain('lang="zh-CN"');
            expect(response.text).toContain('charset="UTF-8"');
            expect(response.text).toContain('viewport');
        });
    });

    describe('Performance and reliability', () => {
        it('should respond quickly to all main routes', async () => {
            const routes = ['/', '/posts', '/destinations', '/posts/1', '/destinations/1'];
            
            const promises = routes.map(route => 
                request(app).get(route).expect(200)
            );
            
            const responses = await Promise.all(promises);
            
            responses.forEach(response => {
                expect(response.text).toContain('旅行日记');
            });
        });

        it('should handle concurrent requests', async () => {
            const concurrentRequests = Array(10).fill(null).map(() => 
                request(app).get('/').expect(200)
            );
            
            const responses = await Promise.all(concurrentRequests);
            
            responses.forEach(response => {
                expect(response.text).toContain('旅行日记');
            });
        });
    });
});
