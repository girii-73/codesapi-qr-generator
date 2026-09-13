"use client";

import { useEffect, useRef, useCallback } from "react";
import QRCodeStyling, {
  type FileExtension,
} from "qr-code-styling";
import DownloadButtons from "./DownloadButtons";

interface QRGeneratorProps {
  shortUrl: string;
}

/** QR instance for the on-screen preview (lime accent on dark) */
function createPreviewQR(data: string): QRCodeStyling {
  return new QRCodeStyling({
    width: 512,
    height: 512,
    data,
    margin: 12,
    qrOptions: {
      errorCorrectionLevel: "H",
    },
    image: "/codesapiens-logo.png",
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 6,
      imageSize: 0.22,
    },
    dotsOptions: {
      color: "#D7FF3D",
      type: "rounded",
    },
    cornersSquareOptions: {
      color: "#D7FF3D",
      type: "extra-rounded",
    },
    cornersDotOptions: {
      color: "#D7FF3D",
      type: "dot",
    },
    backgroundOptions: {
      color: "#141414",
    },
  });
}

/** QR instance for download (high-contrast black on white for reliable scanning) */
function createDownloadQR(data: string): QRCodeStyling {
  return new QRCodeStyling({
    width: 1024,
    height: 1024,
    data,
    margin: 16,
    qrOptions: {
      errorCorrectionLevel: "H",
    },
    image: "/codesapiens-logo.png",
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 6,
      imageSize: 0.22,
    },
    dotsOptions: {
      color: "#000000",
      type: "rounded",
    },
    cornersSquareOptions: {
      color: "#000000",
      type: "extra-rounded",
    },
    cornersDotOptions: {
      color: "#000000",
      type: "dot",
    },
    backgroundOptions: {
      color: "#FFFFFF",
    },
  });
}

export default function QRGenerator({ shortUrl }: QRGeneratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous QR
    containerRef.current.innerHTML = "";

    const qr = createPreviewQR(shortUrl);
    qr.append(containerRef.current);
    qrRef.current = qr;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [shortUrl]);

  const handleDownload = useCallback(
    (format: "png" | "svg" | "jpeg") => {
      // Create a separate high-contrast QR for download
      const downloadQR = createDownloadQR(shortUrl);

      // qr-code-styling needs a temp container to render before downloading
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      document.body.appendChild(tempDiv);

      downloadQR.append(tempDiv);

      // Small delay to allow canvas to render
      setTimeout(() => {
        downloadQR.download({
          name: `codesapiens-qr-${Date.now()}`,
          extension: format as FileExtension,
        });
        document.body.removeChild(tempDiv);
      }, 300);
    },
    [shortUrl]
  );

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      {/* QR Preview */}
      <div className="qr-container rounded-2xl border border-border bg-bg-surface p-4 shadow-lg shadow-black/20">
        <div
          ref={containerRef}
          className="flex items-center justify-center"
          style={{ width: 280, height: 280 }}
        />
      </div>

      <p className="text-xs text-text-muted text-center max-w-xs">
        Preview uses on-brand colors · Downloads are high-contrast black-on-white
        for reliable scanning
      </p>

      {/* Download Buttons */}
      <DownloadButtons onDownload={handleDownload} />
    </div>
  );
}
