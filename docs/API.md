# CareNest API Docs

## REST Endpoints
- `POST /api/auth/login` - email/password login (OTP & 2FA placeholders documented in roadmap).
- `GET /api/patients` - list patient profiles including demographics, allergies, care plans, consent metadata.
- `GET /api/visits` / `POST /api/visits` - visit scheduling and assignment.
- `POST /api/visits/:id/start` and `POST /api/visits/:id/complete` - visit workflow lifecycle.
- `POST /api/vitals` - record BP, SpO2, glucose, weight values.
- `POST /api/messages` - secure in-app messaging + websocket fanout.
- `POST /api/invoices/generate/:visitId` and `GET /api/invoices/export.csv` - billing basics.
- `GET /api/audit-logs` - read audit trail.
- `POST /api/sync/visits` - offline queue synchronization.

## Real-time API
- Socket.IO channel `message:new` for chat updates.
- Socket.IO channel `telehealth:signal` for WebRTC signaling events.

## Security Notes
- Server-side RBAC hooks should wrap each route prior to production.
- Encrypt data at rest with managed DB/S3 KMS (AES-256).
- Enforce TLS termination at ingress and HSTS.
