import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../backend/src/server';

describe('CareNest API', () => {
  it('logs in seeded admin', async () => {
    const response = await request(app).post('/api/auth/login').send({ email: 'admin@carenest.test', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body.user.role).toBe('admin');
  });

  it('creates visit and writes audit logs', async () => {
    const create = await request(app).post('/api/visits').send({ actor: 'u_admin', patientId: 'pt_01', caregiverId: 'u_cg1', startTime: new Date().toISOString(), status: 'scheduled', visitType: 'followup' });
    expect(create.status).toBe(201);
    const logs = await request(app).get('/api/audit-logs');
    expect(logs.body.length).toBeGreaterThan(0);
  });
});
