"use client";

interface DownloadButtonsProps {
  onDownload: (format: "png" | "svg" | "jpeg") => void;
}

export default function DownloadButtons({ onDownload }: DownloadButtonsProps) {
  const formats: { ext: "png" | "svg" | "jpeg"; label: string }[] = [
    { ext: "png", label: "PNG" },
    { ext: "svg", label: "SVG" },
    { ext: "jpeg", label: "JPEG" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-text-muted mr-1">Download:</span>
      {formats.map(({ ext, label }) => (
        <button
          key={ext}
          onClick={() => onDownload(ext)}
          className="rounded-lg border border-border bg-bg-muted px-4 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent hover:text-accent hover:bg-accent-muted active:scale-95"
          aria-label={`Download QR code as ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
