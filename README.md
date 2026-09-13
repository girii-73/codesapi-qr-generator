# CodeSapiens QR — Branded QR Code Generator

A standalone, logo-embedded QR code generator built for the [CodeSapiens](https://codesapiens.dev) developer community.

Built with **Next.js 15+** (App Router, TypeScript), **Tailwind CSS v4**, and **qr-code-styling**.

---

## Features

- ⚡ **Pure QR Code Generation** — No URL shortener or redirect hops; encodes your exact URL or text directly.
- 🚀 **100% Client-Side & Private** — No database, no accounts, zero backend latency. Everything renders directly in the browser.
- 🎨 **CodeSapiens Logo Embedded** — Embedded logo centered with Level-H error correction (30% recovery) for reliable scanning on every device.
- 🎭 **Curated Color Palettes** — CodeSapiens Lime on Dark, Clean Black & White, Dark Minimal, Cyber Cyan, and Neon Violet.
- 📐 **Custom Pattern & Corner Styles** — Rounded, Dots, Classy, and Pill styles.
- 🖼️ **Custom Logo Upload** — Use the official CodeSapiens community logo or upload your own badge on the fly.
- 📥 **Multi-format High-Res Export** — Download 1200×1200 PNG, JPEG, or scalable vector SVG (ideal for posters, stickers, slides, and conference badges).
- 🖨️ **Print-Ready B&W Mode** — One-click high-contrast black-on-white export for commercial print.
- 📋 **Copy to Clipboard** — Copy the generated QR code image directly to your clipboard.

---

## Local Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd codesapi-qr-generator
npm install
```

### 2. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> No database or API keys required!

---

## Deployment (Vercel)

1. Push your repo to GitHub.
2. Import the repo on [vercel.com/new](https://vercel.com/new).
3. Click **Deploy** — zero environment variables needed!

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout + header/footer + metadata
│   ├── page.tsx                # Main QR generator UI
│   └── globals.css             # Dark theme design system (Tailwind v4)
├── components/
│   └── QRGenerator.tsx         # Interactive QR canvas, styling controls & export
└── public/
    └── codesapiens-logo.png    # Default community logo
```

---

## Swapping the Default Logo

Replace `public/codesapiens-logo.png` with your community logo:
- **Format:** PNG with transparent background
- **Size:** Square, at least 200×200px
- **Usage:** Appears in the site header, favicon, and embedded in default QR codes

---

## License

MIT
