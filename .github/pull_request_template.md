---
name: Rebuild: Next.js + Prisma backend, admin-invite auth, initial scaffold
about: "Adds Next.js + Prisma, admin-invite flow, basic API routes, and initial app shell"

---

This PR introduces the initial rebuilt scaffold for the SCP Universal Module and Server Hub.

Summary
- Next.js (App Router) + TypeScript + Tailwind setup.
- Prisma schema and client with a seed script.
- Simple admin-invite flow: POST /api/auth/invite to create an admin with one-time token (ADMIN_INVITE_SECRET).
- Session login flow: POST /api/auth/login sets an HttpOnly JWT cookie.
- GET /api/auth/me for session user info.
- GET /api/modules stub wired to Prisma.
- .env.example, README, and local setup scripts.

Checklist / Next tasks
- [ ] Set DATABASE_URL, JWT_SECRET, ADMIN_INVITE_SECRET in environment (see .env.example)
- [ ] Run `npx prisma generate` and `npx prisma migrate dev` then `npm run seed`
- [ ] Port the full frontend UI (Modules, Servers, Admin) from the original Zite app
- [ ] Implement remaining API routes (create/update/delete modules, servers, categories)
- [ ] Add admin role enforcement and route protection
- [ ] Add CI (lint/test/build) and deployment instructions

Notes
- Secrets are not included in the repo. Configure env vars in your host (Vercel / local .env).
- The admin-invite flow uses ADMIN_INVITE_SECRET: set this once for initial admin creation.

