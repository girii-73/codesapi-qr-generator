"use client";

import { useState } from "react";

interface LinkFormProps {
  onSuccess: (data: { code: string; shortUrl: string }) => void;
}

export default function LinkForm({ onSuccess }: LinkFormProps) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const body: Record<string, string> = { url: url.trim() };
      if (showCustom && customCode.trim()) {
        body.customCode = customCode.trim();
      }

      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      onSuccess(data);
      setUrl("");
      setCustomCode("");
      setShowCustom(false);
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {/* URL Input */}
      <div className="relative">
        <label htmlFor="url-input" className="sr-only">
          Destination URL
        </label>
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here…"
          required
          className="w-full rounded-xl border border-border bg-bg-surface px-5 py-4 text-base text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Custom slug toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className="text-sm text-text-secondary hover:text-accent transition-colors"
        >
          {showCustom ? "− Hide custom slug" : "+ Add custom slug"}
        </button>
      </div>

      {/* Custom slug input */}
      {showCustom && (
        <div className="animate-fade-in">
          <label htmlFor="custom-code-input" className="sr-only">
            Custom slug
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-surface px-4 py-3">
            <span className="text-sm text-text-muted whitespace-nowrap font-mono">
              /q/
            </span>
            <input
              id="custom-code-input"
              type="text"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="my-custom-slug"
              maxLength={20}
              className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-muted outline-none"
            />
          </div>
          <p className="mt-1.5 text-xs text-text-muted">
            3-20 characters · letters, numbers, hyphens, underscores
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="animate-fade-in rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="w-full rounded-xl bg-accent px-6 py-4 text-base font-semibold text-bg-dark transition-all hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin-slow h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Generating…
          </span>
        ) : (
          "Generate Short Link & QR"
        )}
      </button>
    </form>
  );
}
