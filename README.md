# Manish Vaghasiya — Official Website (Coming Soon)

A premium, interactive, and SEO-optimized **Coming Soon** landing page and subscriber capture API for Manish Vaghasiya (Transformational Speaker & Coach).

---

## 📁 Project Structure

```text
manishvaghasiya/
├── frontend/                  # React + Vite + TypeScript (UI layer)
│   ├── src/
│   │   ├── components/        # Interactive components (Hero, Particles, Countdown)
│   │   └── hooks/             # Custom utility hooks (useCountdown)
│   ├── public/                # SEO assets (sitemap.xml, robots.txt, manifest.json)
│   ├── index.html             # Main entry point with full SEO Schema markup
│   └── vercel.json            # Vercel redirection logic for .in domain
├── backend/                   # Node.js + Express + TypeScript (API layer)
│   ├── src/
│   │   ├── models/            # MongoDB Schemas (Subscriber)
│   │   ├── routes/            # Subscription endpoints
│   │   └── middleware/        # express-rate-limit validation
│   └── .env.example           # API configuration template
└── README.md                  # Development & deployment instructions
```

---

## 🛠️ Local Development Setup

Ensure you have [Node.js (v20+)](https://nodejs.org) installed.

### 1. Clone & Set Up Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit the `.env` file with your credentials:
```env
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/manishvaghasiya
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=manish@manishvaghasiya.com
ADMIN_KEY=your-secret-admin-key
```
*Note: If no `MONGODB_URI` is provided, the backend will automatically start in **Offline Mock Mode**, allowing you to test form submissions locally without database connections!*

Start the backend:
```bash
npm run dev
```

### 2. Set Up Frontend

```bash
cd ../frontend
npm install
```

Start the frontend:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🚀 Testing & Verification

We have verified the following core components locally:
- **TypeScript & Vite Builds**: The frontend compiles cleanly into a production bundle via `npm run build`.
- **API Form Submission**: Successfully parses names and emails via `zod`.
- **Offline Fallback**: Submitting the signup form works even if MongoDB is not connected (useful for local development).
- **Rate Limiting**: Exceeding 5 requests in 15 minutes properly yields a `429 Too Many Requests` response.

---

## 🌍 Production Deployment

### Frontend (Vercel)
1. Import the root repository in Vercel.
2. Set the root directory of the project to `frontend`.
3. Add the following environment variable:
   - `VITE_API_URL`: Set to your deployed backend API URL (e.g., `https://api.manishvaghasiya.com`).
4. Vercel will automatically read `vercel.json` and map the permanent 301 redirection from `.in` domains to the canonical `.com` domain.

### Backend (Railway / Render / Heroku)
1. Deploy the backend using the Node.js builder.
2. Set the build command to `npm run build` and start command to `npm start`.
3. Configure the environment variables in your hosting provider's dashboard corresponding to `.env.example`.
