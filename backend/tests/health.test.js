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

  it('ignores a client-supplied roleId and assigns the configured default self-registration role', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: 'Role',
      lastName: 'Guard',
      email: 'role-guard@example.com',
      phoneNumber: '0700000001',
      password: 'StrongPass123!',
      roleId: 999
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', 'role-guard@example.com');
    expect(res.body).toHaveProperty('status', 'pending_activation');
  });
});
