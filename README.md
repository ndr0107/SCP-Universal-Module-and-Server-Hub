# SCP Universal Module and Server Hub (rebuild)

This repository is a rebuilt Next.js + Prisma scaffold for the original Zite-based project. It implements a simple admin-invite flow and provides API routes and a minimal frontend shell.

Quick start (local):

1. Copy `.env.example` to `.env` and set values (DATABASE_URL, JWT_SECRET, ADMIN_INVITE_SECRET).
2. Install dependencies:
   npm install
3. Generate Prisma client & run migration:
   npx prisma generate
   npx prisma migrate dev --name init
4. Start dev server:
   npm run dev

Admin invite flow

- Create a one-time invite token (set ADMIN_INVITE_SECRET in your environment). To create an admin user, POST to `/api/auth/invite` with { token, email, password }.
- Log in at `/api/auth/login` to receive a session cookie.

Next steps (planned)
- Port the full frontend UI into the app.
- Implement full CRUD for modules, servers, categories.
- Add tests and CI.

