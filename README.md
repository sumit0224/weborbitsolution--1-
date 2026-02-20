# WebOrbitSolution

This repo is split into two apps:

- `client/` - Vite + React frontend
- `server/` - Express + MongoDB + Nodemailer + PayU backend

## Development

1. Install dependencies in each app:
   - `cd client && npm install`
   - `cd server && npm install`

2. Create backend env file:
   - Copy `server/.env.example` to `server/.env` and fill values.

3. Create frontend env file (optional):
   - Copy `client/.env.example` to `client/.env`.
   - Set `PAYMENTS_BACKEND_URL` to your Express backend origin (for PayU checkout proxy).

4. Run both apps:
   - Frontend: `cd client && npm run dev`
   - Backend: `cd server && npm run dev`

The frontend proxies `/api` requests to `http://localhost:4000` by default.

## PayU Redirect Setup

- In `server/.env`, set `PAYMENT_CLIENT_URL` to your live frontend origin (for example `https://www.weborbitsolution.in`).
- Ensure `PAYU_SURL` and `PAYU_FURL` point to backend callback endpoints, or keep `SERVER_PUBLIC_URL` set so they are generated automatically.
