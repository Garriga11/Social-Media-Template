# Full-Stack App with Clerk, Stripe, Prisma, and Next.js

This is a production-ready full-stack web application built with:

- **Next.js App Router**
- **Clerk** for authentication and user management

- **Prisma** as the ORM with PostgreSQL
- **Vercel** for deployment
- **Svix (via Clerk)** for secure webhooks
  

---

## Features

- [x] Role-based authentication with Clerk (admin/member)
- [x] Webhook handling (Clerk user sync via Svix)
- [x] Server actions and Prisma integration
- [x] Deployed on Vercel 
- [x] Clean folder structure for scalability

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo

npm install


npx prisma generate
npx prisma migrate dev --name init

# Clerk (test or production)
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLERK_WEBHOOK_SECRET=...


# Prisma
DATABASE_URL=postgresql://...

# Other
NEXT_PUBLIC_CLERK_FRONTEND_API=...


npm run dev
