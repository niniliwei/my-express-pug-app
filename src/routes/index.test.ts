import request from 'supertest';
import express from 'express';
import path from 'path';
import { setRoutes } from './index';

// Create test app
const createTestApp = () => {
    const app = express();
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    setRoutes(app);
    
    // Add error handling for tests
    app.use((req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    
    return app;
};

describe('Routes', () => {
    let app: express.Application;

    beforeEach(() => {
        app = createTestApp();
    });

    describe('GET /', () => {
        it('should respond with 200 status', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
        });
    });

    describe('GET /posts', () => {
        it('should respond with 200 status', async () => {
            const response = await request(app)
                .get('/posts')
                .expect(200);
        });
    });

    describe('GET /posts/:id', () => {
        it('should respond with 200 for valid post ID', async () => {
            const response = await request(app)
                .get('/posts/1')
                .expect(200);
        });

        it('should respond with 404 for invalid post ID', async () => {
            const response = await request(app)
                .get('/posts/999')
                .expect(404);
        });
    });

    describe('GET /destinations', () => {
        it('should respond with 200 status', async () => {
            const response = await request(app)
                .get('/destinations')
                .expect(200);
        });
    });

    describe('GET /destinations/:id', () => {
        it('should respond with 200 for valid destination ID', async () => {
            const response = await request(app)
                .get('/destinations/1')
                .expect(200);
        });

        it('should respond with 404 for invalid destination ID', async () => {
            const response = await request(app)
                .get('/destinations/999')
                .expect(404);
        });
    });

    describe('GET /search', () => {
        it('should respond with 200 when query is provided', async () => {
            const response = await request(app)
                .get('/search?q=京都')
                .expect(200);
        });

        it('should redirect when no query is provided', async () => {
            const response = await request(app)
                .get('/search')
                .expect(302);
        });
    });

    describe('Invalid routes', () => {
        it('should respond with 404 for non-existent routes', async () => {
            const response = await request(app)
                .get('/non-existent-route')
                .expect(404);
        });
    });
});