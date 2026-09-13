"use client";

import { useState } from "react";
import LinkForm from "@/components/LinkForm";
import QRGenerator from "@/components/QRGenerator";
import CopyLinkButton from "@/components/CopyLinkButton";

interface LinkResult {
  code: string;
  shortUrl: string;
}

export default function Home() {
  const [result, setResult] = useState<LinkResult | null>(null);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-12 sm:py-20">
      {/* ── Hero ── */}
      <section className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Shorten. Brand.{" "}
          <span className="text-accent">Share.</span>
        </h1>
        <p className="text-lg sm:text-xl text-text-secondary max-w-lg mx-auto leading-relaxed">
          Generate short links and logo-embedded QR codes for the CodeSapiens
          community — in seconds.
        </p>
      </section>

      {/* ── Form ── */}
      <section className="mb-10">
        <LinkForm
          onSuccess={(data) => setResult(data)}
        />
      </section>

      {/* ── Result ── */}
      {result && (
        <section className="animate-fade-in space-y-8">
          {/* Short link display */}
          <div className="rounded-xl border border-border bg-bg-surface p-5">
            <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
              Your short link
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-mono text-lg hover:underline underline-offset-4 break-all"
              >
                {result.shortUrl}
              </a>
              <CopyLinkButton shortUrl={result.shortUrl} />
            </div>
          </div>

          {/* QR code */}
          <div className="flex justify-center">
            <QRGenerator shortUrl={result.shortUrl} />
          </div>
        </section>
      )}

      {/* ── Features hint ── */}
      {!result && (
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.84-9.84l-4.5 4.5a4.5 4.5 0 00-1.242 7.244" />
                </svg>
              ),
              title: "Instant Short Links",
              desc: "Paste a URL and get a clean short link backed by Supabase.",
            },
            {
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75H16.5v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
              ),
              title: "Branded QR Codes",
              desc: "Logo-embedded QR codes with H-level error correction.",
            },
            {
              icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              ),
              title: "Multi-format Export",
              desc: "Download as PNG, SVG, or JPEG — ready for print or digital.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-bg-surface/50 p-6 transition-colors hover:border-border-hover"
            >
              <div className="inline-flex items-center justify-center rounded-lg bg-accent-muted p-2.5 text-accent mb-3">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
