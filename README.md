# MRT Materials

Static bilingual corporate catalogue and RFQ website for MRT Materials. Built with Next.js App Router, TypeScript and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. English lives at `/en`; Vietnamese lives at `/vi`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` writes the fully static site to `out/`. No server runtime or database is required.

## Catalogue and content

- Add or update categories and products in `data/catalog.ts`. Navigation, filters, routes and sitemap are generated from that file.
- English and Vietnamese interface copy lives in `content/en.ts` and `content/vi.ts`.
- Unknown company details and launch decisions are tracked in `TODO.md`.

## RFQ delivery

By default, the RFQ form posts directly to `sales@mrtmaterials.com` through FormSubmit and supports attachments up to 10 MB in total. The mailbox owner must approve FormSubmit's one-time activation email before customer submissions are forwarded.

To replace FormSubmit with another compatible multipart endpoint, set:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://your-form-endpoint.example
```

## Deploy to Vercel

1. Import the `mrtmaterials/MRTWEB` GitHub repository in Vercel.
2. Add `NEXT_PUBLIC_FORM_ENDPOINT` only when replacing the default FormSubmit endpoint.
3. Deploy; Vercel will run `npm run build` and serve the static export.
4. Add `mrtmaterials.com` in **Project → Settings → Domains**.
5. At the domain registrar, add only the A/CNAME records Vercel shows.

Do not delete or modify existing Google Workspace MX records when adding website DNS records; those records control company email delivery.

## Monthly production audit

`.github/workflows/monthly-site-audit.yml` runs on the first day of every month at 09:00 Vietnam time and can also be started manually. It checks every sitemap URL, H1 structure, horizontal overflow, console errors and responsive screenshots. Reports are retained as GitHub Actions artifacts for 90 days.
