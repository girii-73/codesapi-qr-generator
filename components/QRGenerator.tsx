"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import QRCodeStyling, {
  type FileExtension,
  type DotType,
  type CornerSquareType,
  type CornerDotType,
} from "qr-code-styling";

interface ThemeOption {
  id: string;
  name: string;
  dotColor: string;
  bgColor: string;
  cornerColor: string;
  previewClass: string;
}

const THEMES: ThemeOption[] = [
  {
    id: "codesapiens-lime",
    name: "CodeSapiens Lime",
    dotColor: "#D7FF3D",
    bgColor: "#141414",
    cornerColor: "#D7FF3D",
    previewClass: "bg-[#141414] border-[#D7FF3D]",
  },
  {
    id: "classic-print",
    name: "Print Black & White",
    dotColor: "#000000",
    bgColor: "#FFFFFF",
    cornerColor: "#000000",
    previewClass: "bg-white border-neutral-300",
  },
  {
    id: "dark-minimal",
    name: "Dark Minimal",
    dotColor: "#F3F4F6",
    bgColor: "#18181B",
    cornerColor: "#F3F4F6",
    previewClass: "bg-[#18181B] border-neutral-600",
  },
  {
    id: "cyber-cyan",
    name: "Cyber Cyan",
    dotColor: "#00F0FF",
    bgColor: "#090D16",
    cornerColor: "#00F0FF",
    previewClass: "bg-[#090D16] border-[#00F0FF]",
  },
  {
    id: "neon-purple",
    name: "Neon Violet",
    dotColor: "#C084FC",
    bgColor: "#130E24",
    cornerColor: "#C084FC",
    previewClass: "bg-[#130E24] border-[#C084FC]",
  },
];

const DOT_STYLES: { id: DotType; label: string }[] = [
  { id: "rounded", label: "Rounded" },
  { id: "dots", label: "Dots" },
  { id: "classy", label: "Classy" },
  { id: "classy-rounded", label: "Smooth" },
  { id: "square", label: "Square" },
];

const CORNER_STYLES: { id: CornerSquareType; label: string }[] = [
  { id: "extra-rounded", label: "Pill" },
  { id: "dot", label: "Dot" },
  { id: "square", label: "Square" },
];

const PRESET_URLS = [
  { label: "CodeSapiens", url: "https://codesapiens.dev" },
  { label: "GitHub", url: "https://github.com" },
  { label: "Documentation", url: "https://docs.codesapiens.dev" },
  { label: "Discord", url: "https://discord.gg/codesapiens" },
];

export default function QRGenerator() {
  const [content, setContent] = useState("https://codesapiens.dev");
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(THEMES[0]);
  const [dotStyle, setDotStyle] = useState<DotType>("rounded");
  const [cornerStyle, setCornerStyle] = useState<CornerSquareType>("extra-rounded");
  const [includeLogo, setIncludeLogo] = useState(true);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeLogo = customLogoUrl || (includeLogo ? "/codesapiens-logo.png" : undefined);

  // Initialize or re-create QRCodeStyling instance
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const qr = new QRCodeStyling({
      width: 320,
      height: 320,
      data: content || "https://codesapiens.dev",
      margin: 10,
      qrOptions: {
        errorCorrectionLevel: "H",
      },
      image: activeLogo,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 6,
        imageSize: 0.24,
      },
      dotsOptions: {
        color: selectedTheme.dotColor,
        type: dotStyle,
      },
      cornersSquareOptions: {
        color: selectedTheme.cornerColor,
        type: cornerStyle,
      },
      cornersDotOptions: {
        color: selectedTheme.cornerColor,
        type: (cornerStyle === "square" ? "square" : "dot") as CornerDotType,
      },
      backgroundOptions: {
        color: selectedTheme.bgColor,
      },
    });

    qr.append(containerRef.current);
    qrInstanceRef.current = qr;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [content, selectedTheme, dotStyle, cornerStyle, activeLogo]);

  // Handle custom logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setCustomLogoUrl(result);
      setIncludeLogo(true);
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setCustomLogoUrl(null);
    setIncludeLogo(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // High-res Download function
  const handleDownload = useCallback(
    async (format: "png" | "svg" | "jpeg", printBw = false) => {
      setDownloadingFormat(format);
      try {
        const downloadTheme = printBw
          ? {
              dotColor: "#000000",
              bgColor: "#FFFFFF",
              cornerColor: "#000000",
            }
          : {
              dotColor: selectedTheme.dotColor,
              bgColor: selectedTheme.bgColor,
              cornerColor: selectedTheme.cornerColor,
            };

        const exportQR = new QRCodeStyling({
          width: 1200,
          height: 1200,
          data: content || "https://codesapiens.dev",
          margin: 16,
          qrOptions: {
            errorCorrectionLevel: "H",
          },
          image: activeLogo,
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 8,
            imageSize: 0.24,
          },
          dotsOptions: {
            color: downloadTheme.dotColor,
            type: dotStyle,
          },
          cornersSquareOptions: {
            color: downloadTheme.cornerColor,
            type: cornerStyle,
          },
          cornersDotOptions: {
            color: downloadTheme.cornerColor,
            type: (cornerStyle === "square" ? "square" : "dot") as CornerDotType,
          },
          backgroundOptions: {
            color: downloadTheme.bgColor,
          },
        });

        const tempDiv = document.createElement("div");
        tempDiv.style.position = "fixed";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);
        exportQR.append(tempDiv);

        await new Promise((resolve) => setTimeout(resolve, 350));

        await exportQR.download({
          name: `codesapiens-qr-${printBw ? "print-" : ""}${Date.now()}`,
          extension: format as FileExtension,
        });

        document.body.removeChild(tempDiv);
      } catch (err) {
        console.error("Failed to export QR code", err);
      } finally {
        setDownloadingFormat(null);
      }
    },
    [content, selectedTheme, dotStyle, cornerStyle, activeLogo]
  );

  // Copy Canvas Image to Clipboard
  const handleCopyImage = async () => {
    try {
      const canvas = containerRef.current?.querySelector("canvas");
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2500);
      }, "image/png");
    } catch {
      // Fallback: Copy URL text
      await navigator.clipboard.writeText(content);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="w-full space-y-10">
      {/* ── Input Section ── */}
      <div className="rounded-2xl border border-border bg-bg-surface p-6 sm:p-8 shadow-xl shadow-black/30">
        <label
          htmlFor="qr-content-input"
          className="block text-sm font-semibold tracking-wide text-text-primary mb-2"
        >
          Enter URL or Any Text
        </label>
        <div className="relative">
          <input
            id="qr-content-input"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your link (e.g. https://yourwebsite.com) or text…"
            className="w-full rounded-xl border border-border bg-bg-dark px-5 py-4 text-base font-mono text-text-primary placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {content && (
            <button
              onClick={() => setContent("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary bg-bg-surface px-2.5 py-1 rounded-md border border-border transition-colors"
              title="Clear input"
            >
              Clear
            </button>
          )}
        </div>

        {/* Preset quick-chips */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-muted">Presets:</span>
          {PRESET_URLS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setContent(preset.url)}
              className="rounded-full border border-border/80 bg-bg-muted/70 px-3 py-1 text-xs text-text-secondary transition-all hover:border-accent hover:text-accent active:scale-95"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Workspace Grid (Preview & Customization) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: QR Code Preview & Actions */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full rounded-2xl border border-border bg-bg-surface p-6 sm:p-8 shadow-xl shadow-black/40 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Live Preview (Error Level H)
              </span>
              <button
                onClick={handleCopyImage}
                className="text-xs text-text-secondary hover:text-accent transition-colors inline-flex items-center gap-1.5 bg-bg-muted px-2.5 py-1 rounded-md border border-border/80"
              >
                {copiedNotification ? (
                  <span className="text-accent font-medium">✓ Copied Image!</span>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy Image
                  </>
                )}
              </button>
            </div>

            {/* QR Canvas Box */}
            <div
              className="p-4 rounded-2xl border border-border shadow-inner transition-colors duration-300 flex items-center justify-center max-w-full overflow-hidden"
              style={{ backgroundColor: selectedTheme.bgColor }}
            >
              <div
                ref={containerRef}
                className="flex items-center justify-center"
                style={{ width: 280, height: 280 }}
              />
            </div>

            <p className="mt-4 text-xs text-text-muted max-w-xs leading-relaxed">
              Scan with your phone camera to test. High error correction ensures the embedded logo never degrades readability.
            </p>

            {/* Download Buttons */}
            <div className="mt-6 w-full pt-6 border-t border-border">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Download High-Resolution (1200×1200)
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {(["png", "svg", "jpeg"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => handleDownload(fmt, false)}
                    disabled={downloadingFormat !== null}
                    className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-accent text-bg-dark font-semibold text-sm transition-all hover:bg-accent-hover active:scale-95 disabled:opacity-50"
                  >
                    <span className="uppercase">{fmt}</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {fmt === "svg" ? "Vector Print" : "Branded"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Print-Ready B&W Alternative */}
              <div className="mt-3 flex items-center justify-between bg-bg-dark p-3 rounded-xl border border-border">
                <div className="text-left">
                  <span className="text-xs font-medium text-text-primary block">
                    Print-Ready B&W
                  </span>
                  <span className="text-[11px] text-text-muted block">
                    Pure black on white for maximum optical contrast
                  </span>
                </div>
                <button
                  onClick={() => handleDownload("png", true)}
                  disabled={downloadingFormat !== null}
                  className="px-3 py-1.5 rounded-lg border border-border bg-bg-surface text-xs font-semibold text-text-primary hover:border-accent hover:text-accent transition-colors"
                >
                  Save B&W
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Color Themes */}
          <div className="rounded-2xl border border-border bg-bg-surface p-6 shadow-xl shadow-black/30">
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Color Palette
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {THEMES.map((theme) => {
                const isSelected = selectedTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "border-accent bg-accent/10 shadow-sm"
                        : "border-border bg-bg-dark/60 hover:border-border-hover hover:bg-bg-dark"
                    }`}
                  >
                    <div
                      className={`h-7 w-7 rounded-lg border flex items-center justify-center shrink-0 ${theme.previewClass}`}
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: theme.dotColor }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-semibold truncate ${
                          isSelected ? "text-accent" : "text-text-primary"
                        }`}
                      >
                        {theme.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logo Branding */}
          <div className="rounded-2xl border border-border bg-bg-surface p-6 shadow-xl shadow-black/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary">
                Center Logo
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLogo}
                  onChange={(e) => setIncludeLogo(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent" />
              </label>
            </div>

            {includeLogo && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-bg-dark border border-border p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={activeLogo}
                      alt="Active Logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary truncate">
                      {customLogoUrl ? "Custom Uploaded Logo" : "CodeSapiens Community Logo"}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Rendered with transparent boundary margin
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-bg-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    Upload Custom Logo
                  </label>
                  {customLogoUrl && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="text-xs text-text-muted hover:text-error transition-colors px-2 py-1"
                    >
                      Reset to Default
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Pattern and Corner Styles */}
          <div className="rounded-2xl border border-border bg-bg-surface p-6 shadow-xl shadow-black/30 space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2.5">
                Dot Pattern Style
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {DOT_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setDotStyle(style.id)}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-medium transition-all ${
                      dotStyle === style.id
                        ? "border-accent bg-accent/10 text-accent font-semibold"
                        : "border-border bg-bg-dark/60 text-text-secondary hover:border-border-hover hover:text-text-primary"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2.5">
                Corner Marker Style
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {CORNER_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setCornerStyle(style.id)}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-medium transition-all ${
                      cornerStyle === style.id
                        ? "border-accent bg-accent/10 text-accent font-semibold"
                        : "border-border bg-bg-dark/60 text-text-secondary hover:border-border-hover hover:text-text-primary"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
