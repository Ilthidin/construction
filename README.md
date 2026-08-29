# Hedgar Construction — Next.js Showcase Site

A construction company showcase website built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4. Includes a password-protected admin panel for managing site content backed by a Supabase (Postgres) database.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Panel Setup

The `/admin` panel lets you add, edit, and delete records for Projects, Services, Awards, Blog Posts, and Team Members. Public pages read live data from the API and fall back to the bundled static data in `src/data/*` if the database is unreachable.

### 1. Create a Supabase project

1. Go to https://supabase.com/dashboard and create a new project.
2. Open **SQL Editor** and run the schema in `supabase/migrations/` (creates the tables, read-only Row Level Security policies, and the blog publish-status column).

### 2. Configure environment variables

Fill in the following in `.env`:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=your-secret-admin-password
ADMIN_LOGIN_KEY=some-long-random-secret
```

- `SUPABASE_URL` / `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` — Project Settings → API.
- `ADMIN_PASSWORD` — the password used to log into the admin panel.
- `ADMIN_LOGIN_KEY` — a long, random, unguessable secret. The admin login page lives at `/login/{ADMIN_LOGIN_KEY}`; `/admin/*` returns **404** to anyone without a valid session, so the panel's existence is hidden.

### 3. Seed the database (optional but recommended)

Loads the existing static content into Supabase:

```bash
npm run seed
```

The seed is idempotent (upserts by id).

### 4. Deploy to Vercel

Add the same variables (including `ADMIN_LOGIN_KEY`) under **Project → Settings → Environment Variables** before deploying.

## Usage

- Public: `/projects`, `/services`, `/awards`, `/about`, `/blog` render live content.
- Admin: go to `/login/{ADMIN_LOGIN_KEY}`, enter the admin password, then manage each content section from the sidebar. Accessing `/admin` without a session returns **404** (the panel is hidden).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npm run seed` — seed Supabase from the static data files