const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');

const app = express();
app.use(express.json());
app.use('/', routes);

beforeAll(done => {
    done();
})

describe('Express App', () => {
    it('GET / should return Hello World!', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello World!');
    });

    describe('POST /convert', () => {
        it('should return 400 for invalid input', async () => {
            const res = await request(app)
                .post('/convert')
                .send({ key: 'value' });
            expect(res.statusCode).toEqual(400);
            expect(res.text).toBe('Invalid input');
        });

        it('should return 400 for invalid object format', async () => {
            const res = await request(app)
                .post('/convert')
                .send([{ id: 123, markdown: 456 }]);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([{ error: 'Invalid object format' }]);
        });

        it('should return converted data for valid input', async () => {
            const res = await request(app)
                .post('/convert')
                .send([{ id: '1', markdown: '# Hello' }]);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([{
                id: '1', portableText: [expect.objectContaining({
                    _type: 'block',
                    style: 'h1',
                    markDefs: [],
                    children: [
                        expect.objectContaining({
                            _type: 'span',
                            text: 'Hello',
                            marks: []
                        })
                    ]
                })]
            }]);
        });
    });
});

afterAll(done => {
    done();
})