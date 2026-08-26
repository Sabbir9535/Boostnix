# Upsurge — SMM Service Ordering Website

A simple, fast, no-login SMM (social media marketing) service ordering website.
Customers browse services, submit an order with a manual payment transaction ID,
and track their order status by Order ID. No customer accounts, no admin panel,
no provider API integration — orders are reviewed and fulfilled manually.

## Project structure

```
smm-order-site/
├── backend/     Express + TypeScript + Prisma + PostgreSQL API
└── frontend/    Next.js + TypeScript + Tailwind CSS
```

## Prerequisites

- Node.js 18+
- A PostgreSQL database (local install, or a hosted one like Neon/Supabase)

## 1. Backend setup

```bash
cd backend
cp .env.example .env
# edit .env and set DATABASE_URL to your PostgreSQL connection string

npm install
npm run prisma:migrate     # creates the Service and Order tables
npm run prisma:seed        # inserts example services (FB/IG/TikTok/YouTube packages)
npm run dev                # starts the API on http://localhost:4000
```

The API exposes:

| Method | Route                      | Purpose                          |
|--------|-----------------------------|-----------------------------------|
| GET    | `/api/services`             | List active services              |
| GET    | `/api/services/:id`         | Get one service                   |
| POST   | `/api/orders`                | Create an order                   |
| GET    | `/api/orders/:orderNumber`  | Track an order (public, limited fields) |

## 2. Frontend setup

In a separate terminal:

```bash
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_API_URL should point at your running backend, e.g. http://localhost:4000/api

# Set the live bKash/Nagad/Rocket receiving number used on the checkout page.
NEXT_PUBLIC_PAYMENT_NUMBER=01XXXXXXXXX

npm install
npm run dev                # starts the site on http://localhost:3000
```

Visit `http://localhost:3000` — you should see the homepage, and `/services` should
list the seeded packages.

## 3. Managing services (no admin panel)

Since there's no admin UI, manage services directly:

- Edit `backend/prisma/seed.ts` and re-run `npm run prisma:seed` to reset services, **or**
- Use `npm run prisma:studio` inside `backend/` to open Prisma Studio, a visual database
  browser where you can add, edit, or deactivate services and view/update orders by hand
  (e.g. set `status` to `CONFIRMED`, `PROCESSING`, `COMPLETED`, or `CANCELLED` once you've
  manually verified payment and placed the order with your SMM provider).

## 4. Order fulfillment workflow

1. Customer submits an order → saved to PostgreSQL with `status: PENDING`.
2. You check new orders in Prisma Studio (or any PostgreSQL client) and verify the
   transaction ID against your payment account.
3. You manually place the equivalent order on your SMM provider's site.
4. You update the order's `status` in the database as it progresses — the customer
   sees this instantly on the `/track` page.

## 5. Deployment notes

- Backend: deploy anywhere that runs Node (Render, Railway, Fly.io, a VPS, etc.). Run
  `npm run build && npm run prisma:deploy && npm start`. Set `DATABASE_URL`,
  `CORS_ORIGIN` (your frontend's URL), and `PORT` as environment variables.
- Frontend: deploy to Vercel or any Node host. Run `npm run build && npm start`. Set
  `NEXT_PUBLIC_API_URL` to your deployed backend's `/api` URL.
- Both `.env.example` files list every variable you need to set.

## Security notes

Even without login, the backend includes: Zod input validation, rate limiting (stricter
on order creation to deter spam), Helmet security headers, CORS restricted to your
frontend's origin, and a tracking endpoint that only ever returns non-sensitive order
fields (never phone, email, or transaction ID).
# Boostnix
