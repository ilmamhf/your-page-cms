# Landing Page + CMS for Companies

A portfolio/business landing-page builder: a **Laravel 12 API** that serves a
section-based public website, plus a **React 19 admin CMS** to manage all of it —
no coding needed to change what's on the page.

```
my-business-cms/
├── be/        Laravel 12 API (PHP 8.2+, Sanctum auth, Postgres/SQLite)
├── fe/        React 19 + Vite + TypeScript + Tailwind v4 SPA
├── PLAN.md            The finish plan and per-phase status
└── IMPLEMENTATION.md  What changed, decisions, verification, backlog
```

## Features

**Public site (`/`)**

- Section-based page: hero, services grid, portofolio grid, metrics, contact
- Content comes entirely from the API (`GET /api/landing-page`)
- Company name, location and social links rendered from the website profile

**Admin CMS (`/admin`)**

- **Website** — manage pages & sections, edit hero (eyebrow, image), activate/deactivate
- **Content** — CRUD for services, portofolios and metrics
- **Profile** — company name/email/phone/location + social media rows (add/remove/edit)
- **Uploads** — pick an image file for hero/service/portofolio/social; stored via the API
- Login/logout with Sanctum bearer tokens; admin routes are guarded

## Quick start

**Backend**

```bash
cd be
composer install
cp .env.example .env
php artisan key:generate          # set DB credentials in .env
php artisan migrate --seed        # seeds the admin account
php artisan storage:link          # once, so uploaded images are served
php artisan serve                 # http://127.0.0.1:8000
```

**Frontend** (new terminal)

```bash
cd fe
npm install
cp .env.example .env.local        # points at the backend API
npm run dev                       # http://localhost:5173
```

**Login:** `admin@example.com` / `password`
Change via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `be/.env`, then
`php artisan db:seed --class=AdminSeeder`. Public registration is disabled —
the seeded account is the only way into the CMS.

## API overview

| Group      | Endpoints                                                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth       | `POST /api/login`, `POST /api/logout`, `GET /api/user`                                                                                                                           |
| Public     | `GET /api/landing-page`, `/pages`, `/sections`, `/services`, `/portofolios`, `/metrics`, `/section-heroes` (+ `/{id}` variants)                                                  |
| CMS (auth) | create/update/delete for sections, section-heroes, services, portofolios, metrics · `GET /sections-cms`, `/content-cms` · `GET/PUT /website-profile-cms` · `POST/DELETE /upload` |

## Development

```bash
cd fe && npm run build   # tsc (strict) + vite production build
cd fe && npm run lint    # oxlint
cd be && vendor/bin/pint # code style
```
