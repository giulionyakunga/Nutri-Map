const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('returns 200 and status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/producers', () => {
  it('requires authentication', async () => {
    const res = await request(app).get('/api/producers');
    expect(res.status).toBe(401);
  });
});

describe('POST /api/auth/login', () => {
  it('rejects invalid payloads with 422', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'not-an-email' });
    expect(res.status).toBe(422);
  });
});

describe('POST /api/auth/register', () => {
  it('rejects a weak password with 422', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'weakpass@example.com',
      password: 'weak',
      roleId: 1
    });
    expect(res.status).toBe(422);
  });
});
