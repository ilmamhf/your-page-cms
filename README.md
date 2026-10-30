# Your Landing Page + CMS

A portfolio/business landing-page builder: made using **Laravel 12 API** that serves a
section-based public website (the backend), plus a **React 19 admin CMS** to manage all of it (the frontend).
No coding needed to change what's on the page.

```
my-business-cms/
├── be/        Laravel 12 API (PHP 8.2+, Sanctum auth, Postgres/SQLite)
└── fe/        React 19 + Vite + TypeScript + Tailwind v4 SPA
```

## Features

**Public site (`/`)**

- Section-based page: hero, services grid, portfolio grid, metrics, contact
- Content comes entirely from the API (`GET /api/landing-page`)
- Company name, location and social links rendered from the website profile
- Graceful degradation — missing images/icons fall back to styled placeholders

**Admin CMS (`/admin`)**

- **Website** — manage pages & sections, edit hero (eyebrow, image, **heading**), activate/deactivate
- **Content** — CRUD for services, portfolios and metrics
- **Profile** — company name/email/phone/location + social media rows (add/remove/edit) + **brand colors** (primary/secondary)
- **Uploads** — pick an image file for hero/service/portfolio/social; stored via the API
- Login/logout with Sanctum bearer tokens; admin routes are guarded

**Business-type-aware seeding** — one command seeds a complete, realistic site for:

- `software` (CodeCraft Studios) — default
- `creative` (Studio Maven)
- `property` (Meridian Real Estate)
- `engineering` (Apex Engineering Group)
- `small_business` (Growth Partners Co.)

Each type gets tailored copy, services, portfolio projects, metrics, and social links.

**Dynamic theming** — configure primary/secondary brand colors in Profile; both public site and admin CMS apply them instantly without rebuild.

## Quick start

**Backend**

```bash
cd be
composer install
cp .env.example .env
php artisan key:generate          # set DB credentials in .env
php artisan migrate --seed        # seeds the admin account + software demo site
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

**Seed a different business type:**

```bash
# Creative agency
BUSINESS_TYPE=creative php artisan db:seed

# Real estate
BUSINESS_TYPE=property php artisan db:seed

# Engineering firm
BUSINESS_TYPE=engineering php artisan db:seed

# Small business consultant
BUSINESS_TYPE=small_business php artisan db:seed
```

## Admin config

Single admin account — configured in `be/config/cms.php` via `.env`:

```env
ADMIN_EMAIL=your@domain.com
ADMIN_PASSWORD=your-secure-password
```

## Brand colors (theme)

Set primary/secondary colors in **Admin → Profile → Brand Colors**. Changes apply to both public site and admin CMS immediately via CSS custom properties. No rebuild needed.

Defaults (if not set): primary `#2563eb` (blue), secondary `#0f172a` (navy).

## API overview

| Group      | Endpoints                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth       | `POST /api/login`, `POST /api/logout`, `GET /api/user`                                                                                                                          |
| Public     | `GET /api/landing-page`, `/pages`, `/sections`, `/services`, `/portofolios`, `/metrics`, `/section-heroes` (+ `/{id}` variants)                                                 |
| CMS (auth) | create/update/delete for sections, section-heroes, services, portfolios, metrics · `GET /sections-cms`, `/content-cms` · `GET/PUT /website-profile-cms` · `POST/DELETE /upload` |

## Development

```bash
cd fe && npm run build   # tsc (strict) + vite production build
cd fe && npm run lint    # oxlint
cd be && vendor/bin/pint # code style
```

## Technology Stack

### Backend — Laravel 12 API

| Library                     | Purpose        | Example                                                                                        |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| **PHP 8.2+**                | Runtime        | Type hints, readonly properties, attributes                                                    |
| **laravel/framework ^12.0** | Core framework | Routing, Eloquent ORM, validation, auth, queues                                                |
| **laravel/sanctum ^4.0**    | API token auth | `POST /api/login` → returns `access_token`; middleware `auth:sanctum` guards `/admin/*` routes |

---

### Frontend — React 19 + Vite + TypeScript + Tailwind v4 (all added)

| Library                         | Purpose              | Example                                                                |
| ------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| **react ^19.2.8**               | UI library           | Function components, hooks, concurrent features                        |
| **react-dom ^19.2.8**           | DOM renderer         | `createRoot().render(<App />)`                                         |
| **react-router ^7.18.4**        | Client routing       | `<Routes><Route path="/admin/*" element={<AdminLayout />} /></Routes>` |
| **axios ^1.20.0**               | HTTP client          | `api.get('/landing-page')`, interceptors for auth                      |
| **tailwindcss ^4.3.3**          | Utility-first CSS    | `@theme { --color-primary: #2563eb; }` → `bg-primary`                  |
| **@tailwindcss/vite ^4.3.3**    | Vite plugin          | Tailwind JIT compilation in Vite                                       |
| **vite ^8.3.0**                 | Dev server + bundler | `npm run dev` (HMR), `npm run build` (production)                      |
| **@vitejs/plugin-react ^6.1.1** | React + Vite         | Fast refresh, JSX transform                                            |
| **typescript ~6.0.2**           | Static typing        | Strict mode, shared types in `fe/src/types/landing.ts`                 |
| **oxlint ^1.81.0**              | Fast linter          | `npm run lint` — Rust-based, checks React, TS, a11y                    |

---

## Architecture Diagrams

### System Overview

```mermaid
graph TB
    subgraph "Client (Browser)"
        FE[React 19 SPA\nPort 5173/4173]
    end

    subgraph "Backend (Laravel 12)"
        API[API Server\nPort 8000]
        DB[(PostgreSQL)]
        STORAGE[Local Storage\n/public/storage]
    end

    FE -->|HTTPS/HTTP\nREST + Bearer Token| API
    API -->|Eloquent ORM| DB
    API -->|File Upload/Serve| STORAGE

    style FE fill:#61dafb,color:#000
    style API fill:#ff2d20,color:#fff
    style DB fill:#336791,color:#fff
    style STORAGE fill:#f0db4f,color:#000
```

### Request Flow — Public Site (`/`)

```mermaid
sequenceDiagram
    participant Browser
    participant FE as React App
    participant API as Laravel API
    participant DB as PostgreSQL

    Browser->>FE: GET /
    FE->>API: GET /api/landing-page
    API->>DB: SELECT pages, sections, services, portofolios, metrics, website_profile
    DB-->>API: Structured data
    API-->>FE: JSON (LandingPageResource)
    FE->>FE: applyTheme() from profile (CSS custom properties)
    FE-->>Browser: Rendered HTML (hydrated)
```

### Request Flow — Admin CMS (Authenticated)

```mermaid
sequenceDiagram
    participant Admin
    participant FE as React Admin
    participant API as Laravel API
    participant DB as PostgreSQL

    Admin->>FE: Opens /admin/login
    FE->>API: POST /api/login {email, password}
    API->>DB: Verify credentials
    API-->>FE: {access_token, user}
    FE->>FE: Store token (localStorage)

    Admin->>FE: Navigate to /admin/website
    FE->>API: GET /sections-cms (Authorization: Bearer)
    API->>DB: SELECT pages, sections, services, portofolios, metrics
    API-->>FE: JSON (CMSSectionResource)
    FE-->>Admin: Section list + edit form

    Admin->>FE: Edit section, click Save
    FE->>API: PUT /section/{id} {title, hero_detail, ...}
    API->>DB: UPDATE section + section_heroes
    API-->>FE: Updated section
    FE->>FE: applyTheme() if colors changed
```

### Theme Color Application

```mermaid
flowchart TD
    A[Admin saves profile with theme colors] --> B[PUT /website-profile-cms]
    B --> C[Laravel updates website_profiles]
    C --> D[Public site loads GET /api/landing-page]
    D --> E[WebsiteLayout useEffect reads profile.theme_*]
    E --> F{Colors set?}
    F -- Yes --> G[applyTheme primary secondary]
    F -- No --> H[clearTheme]
    G --> I[Set CSS custom props on root]
    H --> I
    I --> J[Tailwind utilities resolve to runtime vars]
    J --> K[Instant re-theme no rebuild]

```

### Database Schema (Key Tables)

```mermaid

erDiagram

    WEBSITE_PROFILES {
        BIGINT id PK
        VARCHAR name
        VARCHAR email
        VARCHAR phone_number
        TEXT location
        CHAR theme_primary
        CHAR theme_secondary
    }

    PAGES {
        BIGINT id PK
        VARCHAR name
    }

    SECTIONS {
        BIGINT id PK
        BIGINT page_id FK
        VARCHAR title
        TEXT subtitle
        ENUM section_type
        INT display_order
        BOOLEAN is_active
    }

    SECTION_HEROES {
        BIGINT id PK
        BIGINT section_id FK
        VARCHAR eyebrow
        VARCHAR hero_text
        TEXT description
        VARCHAR image_url
    }

    SERVICES {
        BIGINT id PK
        VARCHAR title
        TEXT description
        VARCHAR icon_url
        INT display_order
        BOOLEAN is_active
    }

    PORTFOLIOS {
        BIGINT id PK
        VARCHAR title
        TEXT description
        VARCHAR image_url
        INT display_order
        BOOLEAN is_active
    }

    METRICS {
        BIGINT id PK
        VARCHAR label
        DECIMAL value
        VARCHAR suffix
        INT display_order
        BOOLEAN is_active
    }

    SOCIAL_MEDIA {
        BIGINT id PK
        BIGINT website_profile_id FK
        VARCHAR name
        VARCHAR link
        VARCHAR icon_url
        INT display_order
    }

    WEBSITE_PROFILES ||--o{ SOCIAL_MEDIA : has
    PAGES ||--o{ SECTIONS : contains
    SECTIONS ||--|| SECTION_HEROES : has_one
    SECTIONS }o--|| SERVICES : references
    SECTIONS }o--|| PORTFOLIOS : references
    SECTIONS }o--|| METRICS : references

```

### Frontend Component Hierarchy

```mermaid
graph TD
    App[App.tsx] --> Router[React Router]

    Router --> PublicLayout[WebsiteLayout.tsx]
    Router --> AdminLayout[AdminLayout.tsx]

    PublicLayout --> Navbar
    PublicLayout --> Main[main]
    Main --> SectionRenderer[SectionRenderer.tsx]
    SectionRenderer --> HeroSection1[HeroSection1.tsx]
    SectionRenderer --> HeroSection3[HeroSection3.tsx]
    SectionRenderer --> SectionCard[SectionCard.tsx]
    SectionRenderer --> GridService[GridService.tsx]
    SectionRenderer --> GridProject[GridProject.tsx]
    SectionCard --> GridService
    SectionCard --> GridProject
    GridService --> CardService[CardService.tsx]
    GridProject --> CardProject[CardProject.tsx]
    Main --> ContactSection[ContactSection.tsx]
    PublicLayout --> Footer[Footer.tsx]

    AdminLayout --> Sidebar[Sidebar.tsx]
    AdminLayout --> Outlet[Outlet]

    Outlet --> LoginPage[LoginPage.tsx]
    Outlet --> WebsitePage[WebsitePage.tsx]
    WebsitePage --> SectionList[SectionList.tsx]
    WebsitePage --> SectionForm[SectionForm.tsx]
    Outlet --> ContentPage[ContentPage.tsx]
    Outlet --> ProfilePage[ProfilePage.tsx]
    Outlet --> Dashboard[Dashboard.tsx]

    SectionForm --> InputField[InputField.tsx]
    SectionForm --> ImageInput[ImageInput.tsx]
    SectionForm --> SectionTypeDropdown
    ProfilePage --> InputField
    ProfilePage --> ImageInput
    ContentPage --> InputField
    ContentPage --> ImageInput
```

### Seeding Flow (Business-Type-Aware)

```mermaid
flowchart TD
    A[php artisan db:seed] --> B{env BUSINESS_TYPE?}
    B -->|software| C[CodeCraft Studios]
    B -->|creative| D[Studio Maven]
    B -->|property| E[Meridian Real Estate]
    B -->|engineering| F[Apex Engineering Group]
    B -->|small_business| G[Growth Partners Co.]
    B -->|unset| C

    C --> H[BusinessTypeAwareSeeder]
    D --> H
    E --> H
    F --> H
    G --> H

    H --> I[Truncate tables preserve admin]
    I --> J[Create WebsiteProfile with type-specific name, email, location, socials]
    J --> K[Create Pages Home, About, Services, Portfolio/Listings/Work/Results, Contact]
    K --> L[Create Sections per page with hero_detail for hero/metrics]
    L --> M[Factory::forBusinessType creates Services, Portfolios, Metrics]
    M --> N[Done: complete tailored site]

```

---

## Key Technical Decisions

| Decision                          | Rationale                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------- | --- |
| **Single admin, no registration** | Simplicity; CMS is for content editors, not public users                               |
| **Local file storage**            | Zero-config, no S3/Cloudinary needed for portfolio sites                               |
| **Tailwind v4 + CSS variables**   | Dynamic theming without rebuild; `@theme` for defaults, runtime CSS vars for overrides |
| **Section-based content model**   | Flexible page builder; each page = ordered list of typed sections                      |     |
| **Business-type seeder**          | Realistic demo data per industry; `BUSINESS_TYPE` env var selects                      |
| **Strict TypeScript + oxlint**    | Catch bugs at compile time; fast Rust-based linter                                     |
| **React 19 + Vite**               | Modern, fast HMR, smaller bundles                                                      |
| **No external state lib (yet)**   | `useState`/`useEffect` sufficient for current scope; React Query on backlog            |
