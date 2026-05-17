# WebOrbitSolution

## Project Overview
WebOrbitSolution is a production-oriented web platform with:
- `client/`: Next.js 16 App Router frontend (SEO pages, blog, APIs, checkout proxy, chatbot).
- `server/`: Express backend (content/admin APIs, inquiry handling, PayU integration).

## Technology Stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS, GSAP, Swiper
- Testing: Jest (`unit` + `API`) and Playwright (`E2E smoke`)
- Backend: Node.js, Express, Mongoose, Zod, Helmet
- Monitoring: Sentry (`@sentry/nextjs`) in production
- Analytics: Google Analytics + Microsoft Clarity

## Installation
From repo root:

```bash
npm run install:deps
```

Or install app dependencies directly:

```bash
npm install --prefix client
npm install --prefix server
```

## Development Commands
- Run frontend dev server: `npm run dev --prefix client`
- Run backend dev server: `npm run dev --prefix server`
- Build frontend for production: `npm run build`

## Testing Commands
- Run all configured tests (Jest + Playwright): `npm test`
- Run only Jest tests: `npm run test:jest --prefix client`
- Run only Playwright tests: `npm run test:e2e --prefix client`

Note: Playwright requires browser binaries once per machine:

```bash
npx playwright install
```

## Deployment Instructions
1. Set all required environment variables for `client` and `server`.
2. Build client:
   - `npm run build`
3. Start server:
   - `npm run start --prefix server`
4. Start Next.js app:
   - `npm run start --prefix client`

Recommended deployment model:
- Deploy `client` and `server` as separate services.
- Configure `PAYMENTS_BACKEND_URL` / `API_BASE_URL` so client API proxy routes target the backend service.
- Keep Sentry DSNs set only in production environments.

## Environment Variables

### Client (`client/.env`)
- `PAYMENTS_BACKEND_URL`: backend base URL for payment proxy routes
- `API_BASE_URL` or `NEXT_PUBLIC_API_BASE_URL`: upstream API base URL for client proxy APIs
- `PAGESPEED_API_KEY` (recommended): Google PageSpeed Insights API key for `/api/speed-check`
- `NEXT_PUBLIC_GA_ID` (optional): Google Analytics tag id
- `NEXT_PUBLIC_SENTRY_DSN` (production): client-side Sentry DSN
- `SENTRY_DSN` (production): server-side Sentry DSN for Next runtime
- `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` (optional): client traces sample rate (default `0.1`)
- `SENTRY_TRACES_SAMPLE_RATE` (optional): server traces sample rate (default `0.1`)

### Server (`server/.env`)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: admin/auth token signing secret
- `SERVER_PUBLIC_URL`: public backend URL
- `PAYMENT_CLIENT_URL`: public frontend URL for redirects
- `PAYU_KEY`, `PAYU_SALT`: PayU credentials
- `PAYU_SURL`, `PAYU_FURL`: PayU callback URLs (if not auto-generated)
- `BREVO_API_KEY` (if inquiry emails enabled)

## Production Validation Checklist
- `npm run build` succeeds.
- `npm test` succeeds.
- No build artifacts are tracked in git (`.next`, `dist` ignored).
- Monitoring DSNs are present in production and absent in local/dev by default.
