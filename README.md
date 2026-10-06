# SSCM — Smart Supply Chain Management

Corporate website and lead management platform for a supply chain management business connecting companies with suppliers and business opportunities in China and international markets.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 7 |
| Backend | Python 3.12+, FastAPI, Pydantic 2, slowapi (rate limit), httpx |
| Email | Resend (transactional) |
| Database | PostgreSQL (future, with admin panel) |

## Repository Structure

```
sscm/
├── frontend/          # React + Vite application
├── backend/           # FastAPI application
├── database/          # Future: migrations, seeds
├── docs/              # Documentation
├── AGENTS.md          # Project guidelines for AI agents
└── README.md          # This file
```

## Prerequisites

- Node.js 20+ and npm
- Python 3.12+
- (Optional) Docker for containerized backend

## Quick Start

### Frontend

```bash
cd frontend
cp .env.example .env        # Edit VITE_API_URL and VITE_SITE_URL
npm install
npm run dev                 # http://localhost:5173
```

### Backend

```bash
cd backend
cp .env.example .env        # Edit RESEND_API_KEY, MAIL_FROM, LEAD_NOTIFY_EMAIL, FRONTEND_ORIGIN
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000   # http://localhost:8000
```

### With Docker (Backend only)

```bash
cd backend
docker build -t sscm-backend .
docker run --env-file .env -p 8000:8000 sscm-backend
```

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | Yes | `http://localhost:8000` | Backend API base URL |
| `VITE_SITE_URL` | Yes | `http://localhost:5173` | Public site URL (for sitemap, canonical, OG) |

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `APP_ENV` | No | `development` | Environment name |
| `FRONTEND_ORIGIN` | Yes | `http://localhost:5173` | CORS origin for frontend |
| `RESEND_API_KEY` | Yes* | — | Resend API key for email |
| `MAIL_FROM` | Yes* | — | Verified sender email in Resend |
| `LEAD_NOTIFY_EMAIL` | Yes* | — | Recipient for lead notifications |
| `RATE_LIMIT_PER_HOUR` | No | `5` | Leads per IP per hour |

*Required for email notifications. If missing, email is skipped (logged).

## Available Commands

### Frontend

```bash
cd frontend
npm run dev          # Development server
npm run build        # Production build (generates robots.txt, sitemap.xml, og-image.png)
npm run lint         # Oxlint
npm run preview      # Preview production build
```

### Backend

```bash
cd backend
uvicorn app.main:app --reload        # Dev server
uvicorn app.main:app --host 0.0.0.0 --port 8000  # Production
pytest                               # Run tests
pytest -v --tb=short                 # Verbose tests
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/leads` | Submit lead (rate limited: 5/hour/IP) |
| `GET` | `/api/leads/health` | Router health check |

### Lead Payload

```json
{
  "nombre": "string (1-100, required)",
  "email": "string (email, required)",
  "mensaje": "string (10-5000, required)",
  "empresa": "string (0-150, optional)",
  "telefono": "string (0-30, optional)",
  "pais": "string (0-100, optional)",
  "motivo": "string (0-100, optional)",
  "website": "string (0-200, optional, honeypot)"
}
```

### Responses

- `201`: `{ "id": "uuid", "status": "received" }`
- `422`: Validation error (Spanish messages)
- `429`: Rate limit exceeded
- `502`: Email service unavailable

## Deployment

See [docs/deploy.md](docs/deploy.md) for production deployment checklist.

## Security

- Never commit `.env` files (in `.gitignore`)
- Frontend never exposes backend secrets
- Rate limiting on lead submission
- Honeypot field (`website`) in contact form
- HTML escaping on all text inputs
- CSP-ready, security headers in Vercel/Docker

## License

Private — SSCM proprietary codebase.