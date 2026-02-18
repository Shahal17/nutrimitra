# CareNest — Digital Home Healthcare Platform

Web-first PWA and mobile-ready care coordination platform for patients, caregivers, family contacts, and clinic admins.

## Working Preview URL
- Local preview: `http://localhost:4173` after running `npm install && npm run build && npm run preview`.

## Stack
- Frontend: React + Vite (responsive/mobile-first screens)
- Backend: Express + Socket.IO
- Data: Prisma schema + SQL migration + seed script
- Realtime: Socket.IO for messaging and WebRTC signaling relay
- PWA: `manifest.webmanifest` + `sw.js`

## Implemented Steps
1. **DB + API skeleton**: `prisma/schema.prisma`, migration SQL, API routes under `backend/src/server.ts`.
2. **UI screens + wireframes**: Login, Patient List/Detail, Visit Calendar, Visit Workflow, Telehealth Room, Messages, Admin Dashboard.
3. **Visit workflow + offline sync**: local queue in `VisitWorkflowScreen.tsx` and `/api/sync/visits` endpoint.
4. **Telehealth + messaging**: WebRTC signaling socket channel + in-app messaging with Socket.IO.
5. **Tests + seed data + preview**: unit tests (Vitest), E2E flow (Playwright), seed generation script.


## Get CareNest as an App
- **PWA install (recommended first):** open deployed URL and install from browser menu (Android Chrome / iOS Safari).
- **Store-ready native app:** use Capacitor wrapper (Android/iOS) with `npm run build`, `npm run mobile:sync`, then `npm run mobile:android` or `npm run mobile:ios`.
- Detailed steps: `docs/APP_INSTALLATION.md`.

## Run locally
```bash
npm install
npm run seed
npm run dev
```
- API at `http://localhost:4000`
- Web at `http://localhost:5173`

## Compliance & Security Notes
- RBAC model for roles (patient/caregiver/family/admin) scaffolded server-side.
- Consent capture embedded in patient model.
- Audit logs generated for write operations.
- TLS, AES-256 at-rest encryption, retention policy, signed attachment URLs, and 2FA/OTP are represented as integration-ready requirements for production deployment.

## Deliverables in repo
- API docs: `docs/API.md`
- Postman collection: `docs/postman_collection.json`
- Migration files: `prisma/migrations/...`
- Seed script/data: `backend/scripts/seed.ts` (+ generated `seed-output.json` when run)
