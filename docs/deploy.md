# SSCM — Deployment Checklist

Production deployment checklist for SSCM frontend (Vercel) and backend (Render/Railway/Fly).

---

## 1. Domain & DNS

- [ ] Domain registered (e.g., `sscm.com`)
- [ ] A/AAAA or CNAME records pointing to Vercel (frontend) and Render/Railway/Fly (backend)
- [ ] HTTPS enforced (automatic on Vercel; configure on backend platform)
- [ ] `www` redirect configured (to apex or vice versa)

---

## 2. Environment Variables

### Frontend (Vercel Project Settings → Environment Variables)

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_API_URL` | `https://api.tudominio.com` | Backend URL (no trailing slash) |
| `VITE_SITE_URL` | `https://tudominio.com` | Public frontend URL (for sitemap, canonical, OG) |

### Backend (Platform Environment Variables)

| Variable | Value | Notes |
|----------|-------|-------|
| `APP_ENV` | `production` | |
| `FRONTEND_ORIGIN` | `https://tudominio.com` | Exact frontend origin for CORS |
| `RESEND_API_KEY` | `re_...` | From Resend dashboard |
| `MAIL_FROM` | `noreply@tudominio.com` | Verified sender in Resend |
| `LEAD_NOTIFY_EMAIL` | `leads@tudominio.com` | Where to receive notifications |
| `RATE_LIMIT_PER_HOUR` | `5` | Or adjust per business need |

---

## 3. Resend Email Setup

- [ ] Domain added in Resend (Domains → Add Domain)
- [ ] SPF record added to DNS:
  ```
  v=spf1 include:_spf.resend.com ~all
  ```
- [ ] DKIM records added (2x CNAME from Resend dashboard)
- [ ] DMARC record added (recommended):
  ```
  v=DMARC1; p=quarantine; rua=mailto:dmarc@tudominio.com
  ```
- [ ] Domain status: **Verified** in Resend
- [ ] Sender email (`MAIL_FROM`) verified: `noreply@tudominio.com`
- [ ] Test email sent from Resend dashboard → received OK

---

## 4. Frontend Deployment (Vercel)

- [ ] Repository connected to Vercel
- [ ] Framework preset: **Vite**
- [ ] Build command: `npm run build` (auto-detected)
- [ ] Output directory: `dist` (auto-detected)
- [ ] Environment variables set (see §2)
- [ ] `vercel.json` present with rewrites and security headers
- [ ] Deploy preview → verify:
  - [ ] Home, About, Contact pages load
  - [ ] Navigation works (SPA routing)
  - [ ] Contact form submits (check network tab → 201 from backend)
  - [ ] Metadata present: `<title>`, `<meta description>`, `<link rel="canonical">`, OG tags
  - [ ] `robots.txt` and `sitemap.xml` accessible at `/robots.txt` and `/sitemap.xml`
  - [ ] `og-image.png` loads at `/og-image.png`
  - [ ] Skip link works (Tab → "Saltar al contenido")
  - [ ] Mobile menu: opens, closes on Escape, closes on route change
- [ ] Promote to production

---

## 5. Backend Deployment (Render / Railway / Fly)

### Option A: Render (Docker)

- [ ] New Web Service → Docker
- [ ] Dockerfile path: `backend/Dockerfile`
- [ ] Environment variables set (see §2)
- [ ] Health check path: `/health`
- [ ] Deploy → verify:
  - [ ] `GET /health` → `{"status":"ok"}`
  - [ ] `POST /api/leads` with valid payload → `201`
  - [ ] `POST /api/leads` with honeypot (`website: "x"`) → `201` (no email sent)
  - [ ] `POST /api/leads` invalid payload → `422` with Spanish messages
  - [ ] Rate limit: 6 requests from same IP → `429`

### Option B: Railway

- [ ] New Project → Dockerfile
- [ ] Dockerfile path: `backend/Dockerfile`
- [ ] Environment variables set (see §2)
- [ ] Deploy → same verification as Render

### Option C: Fly.io

- [ ] `fly launch --dockerfile backend/Dockerfile`
- [ ] `fly secrets set` for all env vars (see §2)
- [ ] `fly deploy`
- [ ] Same verification

---

## 6. End-to-End Form Test

- [ ] Visit production `https://tudominio.com/contact`
- [ ] Fill form with valid data:
  - Nombre: `Test User`
  - Email: `test@tudominio.com` (or real email)
  - Mensaje: `Mensaje de prueba de al menos diez caracteres.`
- [ ] Submit → see "Consulta enviada" success message
- [ ] Check `LEAD_NOTIFY_EMAIL` inbox → email received with:
  - Subject: `Nueva consulta de Test User - SSCM`
  - Reply-To: `test@tudominio.com`
  - All fields present, HTML escaped
- [ ] Test honeypot: submit with `website: "spam"` → success UI but **no email sent**
- [ ] Test validation: submit empty → Spanish error messages
- [ ] Test rate limit: 5 rapid submits → 6th returns error

---

## 7. Security Verification

- [ ] `git log --all -- .env` returns **no results** (never committed)
- [ ] `git log --all -- backend/.env` returns **no results**
- [ ] `git log --all -- frontend/.env` returns **no results**
- [ ] Frontend CSP headers present (check `vercel.json` headers)
- [ ] Backend CORS only allows `FRONTEND_ORIGIN`
- [ ] Rate limiting active on `/api/leads`
- [ ] No console errors in production browser devtools

---

## 8. SEO & Analytics

- [ ] Google Search Console: property added, sitemap submitted
- [ ] `sitemap.xml` contains 3 URLs with correct `https://tudominio.com/...`
- [ ] `robots.txt` allows all, references sitemap
- [ ] Social preview: share URL on LinkedIn/Slack → shows OG image + title + description
- [ ] (Optional) Analytics: Plausible/GA4 script added to `index.html`

---

## 9. Monitoring

- [ ] Backend health check endpoint monitored (uptime monitor)
- [ ] Error logging: Sentry/Logtail/Platform logs configured
- [ ] Email delivery monitoring (Resend dashboard → webhooks or daily check)

---

## 10. Rollback Plan

- [ ] Vercel: previous deployment available for instant rollback
- [ ] Backend: previous Docker image tagged, can redeploy in <2 min
- [ ] Database: not applicable yet (PostgreSQL added with admin panel)

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Reviewer | | | |

---

**Last updated:** 2026-10-06