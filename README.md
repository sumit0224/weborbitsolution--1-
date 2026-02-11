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
   - Copy `client/.env.example` to `client/.env` if you need a custom API base URL.

4. Run both apps:
   - Frontend: `cd client && npm run dev`
   - Backend: `cd server && npm run dev`

The frontend proxies `/api` requests to `http://localhost:4000` by default.
