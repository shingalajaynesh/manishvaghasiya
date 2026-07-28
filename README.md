# Manish Vaghasiya Platform

This repository is now organized as a small product workspace rather than a prototype dump.

It contains:

- `frontend`: React + Vite + TypeScript frontend
- `backend`: Express + TypeScript backend
- `data-models`: centralized shared data-model layer
- `docs/strategy`: strategy, planning, and foundation documents

## Repository Structure

```text
manishvaghasiya/
|-- backend/
|   |-- src/
|   |   |-- middleware/
|   |   |-- models/
|   |   `-- routes/
|   |-- .env.example
|   |-- package.json
|   `-- tsconfig.json
|-- data-models/
|   `-- src/
|-- docs/
|   `-- strategy/
|       |-- manish-vaghasiya-website-strategy.md
|       `-- phase-1-foundation-blueprint.md
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- app/
|   |   |-- content/
|   |   |-- features/
|   |   |-- pages/
|   |   `-- shared/
|   |-- package.json
|   |-- tailwind.config.js
|   |-- vite.config.ts
|   `-- vercel.json
|-- README.md
`-- tsconfig.json
```

## Local Development

Use Node.js `20+`.

### API

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Environment variables:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/manishvaghasiya
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=manishvaghasiya.tech@gmail.com
ADMIN_KEY=your-secret-admin-key
```

If `MONGODB_URI` is missing, the API starts in offline preview mode so form flows can still be tested locally.

### Web

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Current Product Direction

This is no longer planned as a simple coming-soon page.

The target product is:

- a Gujarati-first content platform
- a trust layer for Manish Vaghasiya's public brand
- a lead generation system for PDFs, workshops, and bookings
- a future monetization engine for ebooks, affiliate, and AdSense

Core planning documents:

- [docs/strategy/manish-vaghasiya-website-strategy.md](D:\WEBSITE DEVELOPMENT\manishvaghasiya\docs\strategy\manish-vaghasiya-website-strategy.md)
- [docs/strategy/phase-1-foundation-blueprint.md](D:\WEBSITE DEVELOPMENT\manishvaghasiya\docs\strategy\phase-1-foundation-blueprint.md)

## Deployment Notes

### Web

- Deploy `frontend`
- Set `VITE_API_URL` to the deployed API URL
- Vercel can keep using `vercel.json` inside `frontend`

### API

- Deploy `backend`
- Build command: `npm run build`
- Start command: `npm start`

## Verification

Recent checks completed:

- frontend production build succeeds from `frontend`
- repository structure has been reorganized for long-term scale
- strategy and blueprint docs now live under `docs/strategy`
