# Youth Code Academy - Tech for Social Impact

Platformă completă de cursuri online pentru copii și tineri, construită cu Next.js App Router (SSR/SSG indexabil SEO), Prisma/PostgreSQL, NextAuth, Stripe Checkout + webhook, LMS simplu și admin panel.

## Stack

- Next.js 15 + TypeScript + App Router
- Tailwind + componente UI locale în stil shadcn
- PostgreSQL + Prisma
- NextAuth (Credentials + Google OAuth)
- Stripe Checkout + Webhook security-first
- SMTP (resetare parolă)
- SEO: metadata per pagină, canonical, JSON-LD, sitemap, robots

## Rute implementate

### Public

- `/`
- `/cursuri`
- `/cursuri/[slug]`
- `/cursuri/categorie/[slug]`
- `/calendar`
- `/resurse`
- `/resurse/[slug]`
- `/despre`
- `/contact`
- `/ajutor`
- `/legal/termeni`
- `/legal/confidentialitate`
- `/legal/cookies`
- `/legal/rambursari`
- `/cos`
- `/checkout`
- `/checkout/succes`
- `/checkout/anulat`
- `/auth/login`
- `/auth/register`
- `/auth/reset`

### Utilizator autentificat

- `/cont`
- `/cont/cursurile-mele`
- `/cont/cursuri/[slug]`
- `/cont/calendar`
- `/cont/comenzi`
- `/cont/profil`

### Admin (role=ADMIN)

- `/admin`
- `/admin/cursuri`
- `/admin/sesiuni`
- `/admin/enrolari`
- `/admin/comenzi`
- `/admin/utilizatori`
- `/admin/rapoarte`

## 1) Setup local

### Prerequisite

- Node.js 20+
- PostgreSQL 14+
- Stripe account

### Instalare

```bash
npm install
cp .env.example .env
```

Completează variabilele din `.env`.

### Prisma migrate + generate + seed

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Conturi seed:

- Admin: `admin@youthcodeacademy.ro` / `Admin123!`
- Elev: `elev@youthcodeacademy.ro` / `Elev123!`

### Start local

```bash
npm run dev
```

Deschide `http://localhost:3000`.

## 2) Stripe local (webhook)

Într-un terminal separat:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copiază `whsec_...` și setează în `.env` la `STRIPE_WEBHOOK_SECRET`.

Pentru test checkout folosește chei Stripe test (`sk_test_*`).

## 3) Flux end-to-end MVP

1. Browse catalog la `/cursuri`
2. Add to cart la `/cos`
3. Login/Register
4. Checkout la `/checkout` (Stripe)
5. Webhook `checkout.session.completed` marchează `Order=PAID`
6. Se creează `Enrollment ACTIVE`
7. Cursul devine vizibil în `/cont/cursurile-mele`
8. Portalul cursului `/cont/cursuri/[slug]` afișează lecții + progres + sesiuni live (Meet link doar enrolled)

## 4) Deploy pe Vercel

1. Urcă codul pe GitHub
2. Import repo în Vercel
3. Setează env vars în Vercel Project Settings:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (URL producție)
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_CURRENCY` (`ron`)
   - `NEXT_PUBLIC_SITE_URL`
4. Rulează migrate pe baza de producție:

```bash
npx prisma migrate deploy
```

5. Rulează seed dacă vrei date demo în producție:

```bash
npm run prisma:seed
```

6. Configurează Stripe webhook endpoint:
   - URL: `https://<domeniu>/api/stripe/webhook`
   - Event: `checkout.session.completed`

## 4.1) Deploy pe Netlify (păstrând aceeași aplicație)

Proiectul rămâne Next.js full-stack (SSR/Route Handlers), nu se convertește în site static.

1. Urcă codul pe GitHub
2. Import repo în Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next` (gestionat de pluginul Next.js)
4. Setează aceleași env vars ca la Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (URL-ul Netlify, ex: `https://<site>.netlify.app`)
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_CURRENCY` (`ron`)
   - `NEXT_PUBLIC_SITE_URL` (același URL Netlify)
5. Rulează migrări pe DB de producție (din CI sau local):

```bash
npx prisma migrate deploy
```

6. (Opțional) seed în producție:

```bash
npm run prisma:seed
```

7. În Stripe Dashboard configurează webhook endpoint:
   - URL: `https://<site>.netlify.app/api/stripe/webhook`
   - Event: `checkout.session.completed`

Notă:
- Fișierul `netlify.toml` este deja inclus.
- Deploy-ul pe Vercel rămâne valid; nu am eliminat nimic din setup-ul existent.

## 5) SEO implementat

- Metadata per pagină (title/description)
- Canonical URLs
- OpenGraph + Twitter cards
- JSON-LD:
  - Organization (global)
  - Course (`/cursuri/[slug]`)
  - BreadcrumbList
  - Article (`/resurse/[slug]`)
- `app/sitemap.ts` -> `/sitemap.xml`
- `app/robots.ts` -> `/robots.txt`

## 6) Structură proiect

- `app/` pagini SSR/SSG + route handlers
- `components/` UI și blocuri reutilizabile
- `lib/` db/auth/seo/cart/helpers
- `prisma/` schema + seed
- `app/actions/` server actions pentru auth/admin/lms

## Notă tehnică

- Confirmarea plății este tratată exclusiv în webhook Stripe.
- Cart este persistent în browser (`localStorage`) și sincronizat server-side în cookie HTTP-only.
- Ghid dedicat card payments: `docs/STRIPE_CARD_SETUP.md`.
