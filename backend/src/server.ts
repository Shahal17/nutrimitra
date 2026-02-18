import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { z } from 'zod';
import { auditLogs, invoices, logAction, messages, patients, users, visits, vitals } from './data';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const authSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

app.get('/api/health', (_req, res) => res.json({ ok: true, app: 'CareNest API' }));

app.post('/api/auth/login', (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user = users.find((u) => u.email === parsed.data.email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  logAction({ actor: user.id, action: 'auth.login', targetType: 'user', targetId: user.id, metadata: { method: 'password' } });
  return res.json({ token: `demo-token-${user.id}`, user });
});

app.get('/api/patients', (_req, res) => res.json(patients));
app.get('/api/visits', (_req, res) => res.json(visits));

app.post('/api/visits', (req, res) => {
  const visit = { id: `v_${Date.now()}`, ...req.body };
  visits.push(visit);
  logAction({ actor: req.body.actor ?? 'system', action: 'visit.created', targetType: 'visit', targetId: visit.id, metadata: visit });
  res.status(201).json(visit);
});

app.post('/api/visits/:id/start', (req, res) => {
  const visit = visits.find((v) => v.id === req.params.id);
  if (!visit) return res.status(404).json({ error: 'Visit not found' });
  visit.status = 'in_progress';
  visit.startTime = new Date().toISOString();
  logAction({ actor: req.body.actor ?? 'caregiver', action: 'visit.started', targetType: 'visit', targetId: visit.id, metadata: {} });
  return res.json(visit);
});

app.post('/api/visits/:id/complete', (req, res) => {
  const visit = visits.find((v) => v.id === req.params.id);
  if (!visit) return res.status(404).json({ error: 'Visit not found' });
  visit.status = 'completed';
  visit.endTime = new Date().toISOString();
  visit.notes = req.body.notes;
  visit.durationMins = req.body.durationMins ?? 45;
  logAction({ actor: req.body.actor ?? 'caregiver', action: 'visit.completed', targetType: 'visit', targetId: visit.id, metadata: { notes: visit.notes } });
  return res.json(visit);
});

app.post('/api/vitals', (req, res) => {
  const record = { id: `vt_${Date.now()}`, timestamp: new Date().toISOString(), ...req.body };
  vitals.push(record);
  logAction({ actor: req.body.recordedBy ?? 'caregiver', action: 'vitals.logged', targetType: 'vitals', targetId: String(record.id), metadata: record });
  res.status(201).json(record);
});

app.post('/api/messages', (req, res) => {
  const message = { id: `msg_${Date.now()}`, timestamp: new Date().toISOString(), ...req.body };
  messages.push(message);
  io.emit('message:new', message);
  logAction({ actor: String(req.body.from ?? 'system'), action: 'message.sent', targetType: 'message', targetId: String(message.id), metadata: {} });
  res.status(201).json(message);
});

app.post('/api/invoices/generate/:visitId', (req, res) => {
  const visit = visits.find((v) => v.id === req.params.visitId);
  if (!visit) return res.status(404).json({ error: 'Visit not found' });
  const amount = (visit.durationMins ?? 60) / 60 * (visit.rate ?? 1000);
  const invoice = { id: `inv_${Date.now()}`, visitId: visit.id, amount, status: 'generated' };
  invoices.push(invoice);
  logAction({ actor: req.body.actor ?? 'admin', action: 'invoice.generated', targetType: 'invoice', targetId: invoice.id, metadata: { amount } });
  res.json(invoice);
});

app.get('/api/invoices/export.csv', (_req, res) => {
  const lines = ['id,visitId,amount,status', ...invoices.map((inv) => `${inv.id},${inv.visitId},${inv.amount},${inv.status}`)];
  res.header('Content-Type', 'text/csv');
  res.send(lines.join('\n'));
});

app.get('/api/audit-logs', (_req, res) => res.json(auditLogs));

app.post('/api/sync/visits', (req, res) => {
  const queuedVisits = req.body.visits ?? [];
  queuedVisits.forEach((v: Record<string, unknown>) => {
    visits.push(v as never);
    logAction({ actor: String(v.caregiverId ?? 'caregiver'), action: 'visit.synced', targetType: 'visit', targetId: String(v.id), metadata: v });
  });
  res.json({ synced: queuedVisits.length });
});

io.on('connection', (socket) => {
  socket.on('telehealth:signal', (payload) => socket.broadcast.emit('telehealth:signal', payload));
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = Number(process.env.PORT ?? 4000);
  httpServer.listen(PORT, () => {
    console.log(`CareNest API listening on http://localhost:${PORT}`);
  });
}

export { app };
