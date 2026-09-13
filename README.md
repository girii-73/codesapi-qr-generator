# CodeSapiens QR

A branded URL shortener + logo-embedded QR code generator for the [CodeSapiens](https://codesapiens.dev) developer community.

Built with **Next.js 14+** (App Router, TypeScript), **Tailwind CSS v4**, **Supabase** (Postgres), and **qr-code-styling**.

---

## Features

- ⚡ **Instant short links** — paste a URL, get a clean `/q/<code>` redirect
- 🎨 **Branded QR codes** — CodeSapiens logo embedded with H-level error correction
- 📥 **Multi-format export** — download as PNG, SVG, or JPEG
- 📋 **One-click copy** — copy your short link to the clipboard
- 📊 **Click tracking** — every redirect increments a counter in Supabase
- 🌙 **Dark design system** — lime accent on near-black, inspired by Linear and Vercel

---

## Local Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd codesapiens-qr
npm install
```

### 2. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Open the **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).

### 3. Configure Environment Variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → `anon` / `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → `service_role` key |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` for local dev |

### 4. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel)

1. Push your repo to GitHub.
2. Import the repo on [vercel.com/new](https://vercel.com/new).
3. In the Vercel project settings, add these **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_BASE_URL` — set this to your Vercel domain (e.g. `https://qr.codesapiens.dev`)
4. Deploy. That's it!

> **Note:** Make sure you've already run `supabase/schema.sql` in your Supabase project before deploying.

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout + header/footer
│   ├── page.tsx                # Main generator UI
│   ├── globals.css             # Design system (Tailwind v4)
│   ├── q/[code]/route.ts       # Short link redirect handler
│   └── api/shorten/route.ts    # POST: create a short link
├── components/
│   ├── LinkForm.tsx            # URL input form
│   ├── QRGenerator.tsx         # QR code rendering + download
│   ├── DownloadButtons.tsx     # PNG/SVG/JPEG download buttons
│   └── CopyLinkButton.tsx      # Copy-to-clipboard
├── lib/
│   ├── supabaseClient.ts       # Supabase client (browser + server)
│   └── shortcode.ts            # Code generation + validation
├── public/
│   └── codesapiens-logo.png    # Swap with your real logo
├── supabase/
│   └── schema.sql              # Database schema
└── .env.local.example          # Env var template
```

---

## Swapping the Logo

Replace `public/codesapiens-logo.png` with your actual CodeSapiens logo:
- **Format:** PNG with transparent background
- **Size:** Square, at least 200×200px
- **Usage:** Appears in the site header, favicon, and embedded in QR codes

---

## License

MIT
