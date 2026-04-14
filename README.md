# Michael Kellermann Foundation (MKF) — Website

Informational nonprofit site built with **Next.js 16** (App Router), **TypeScript**, and **Tailwind CSS v4**. Content is placeholder copy and contact details—replace `src/lib/site.ts` and form handlers before production launch.

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+ (or compatible package manager)

## Run locally

```bash
cd mkf-foundation
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack (`next dev --turbopack`).

## Build for production

```bash
npm run build
npm start
```

## Project structure (high level)

- `src/app/` — App Router routes, layouts, global styles, Open Graph image
- `src/components/` — Layout (header/footer), UI primitives, homepage sections, forms
- `src/lib/` — Site constants (`site.ts`) and metadata helpers (`metadata.ts`)

## Configuration notes

- **Canonical URLs & Open Graph:** Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your real domain so metadata URLs resolve correctly.
- **Forms:** Contact, donate, volunteer, and newsletter forms are client-side demos—wire them to your email provider, CRM, or server actions.
- **Payments:** Integrate your nonprofit gateway (e.g. Stripe) on the donate flow.
- **Branding:** Colors and theme tokens live in `src/app/globals.css` (`:root` and `.dark`).

## License

Use and modify for the foundation’s purposes. Ensure you have rights to any content, imagery, and partner names you publish.
