import QRGenerator from "@/components/QRGenerator";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
      {/* ── Hero ── */}
      <section className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Pure QR Code Generator
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          Brand Your Links with{" "}
          <span className="text-accent">Custom QR Codes.</span>
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Generate logo-embedded, high-resolution QR codes for the CodeSapiens
          developer community. Instant, client-side, and ready for print or digital.
        </p>
      </section>

      {/* ── QR Generator Workspace ── */}
      <section className="mb-16">
        <QRGenerator />
      </section>

      {/* ── Feature Highlights ── */}
      <section className="border-t border-border pt-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Engineered for Developers & Community Events
          </h2>
          <p className="text-sm text-text-secondary">
            Everything you need for clean, reliable, and branded QR codes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Client-Side & Fast",
              desc: "Zero database required. Codes are rendered locally in your browser with zero latency.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
            },
            {
              title: "Logo Embedded",
              desc: "Embedded CodeSapiens badge or your own custom logo, centered with high-recovery margins.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              ),
            },
            {
              title: "Level-H Redundancy",
              desc: "Highest error correction level (30%) guarantees scanners can read your code in any lighting.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
            },
            {
              title: "SVG & High-Res PNG",
              desc: "Export 1200px PNGs or infinitely scalable vector SVGs perfect for conference badges and stickers.",
              icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-bg-surface/50 p-6 transition-all hover:border-border-hover"
            >
              <div className="inline-flex items-center justify-center rounded-xl bg-accent-muted p-2.5 text-accent mb-3.5">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{item.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
