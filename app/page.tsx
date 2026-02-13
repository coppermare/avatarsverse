"use client";

import { useState, useCallback } from "react";

const VOXEL_COUNT = 15;
const CDN_BASE = "https://cdn.jsdelivr.net/gh/coppermare/avatarverse";

function placeholderApiUrl(category: string, id: number): string {
  return `/api/avatars/${category}/${id}`;
}

function placeholderCdnUrl(category: string, id: number, tag = "main"): string {
  return `${CDN_BASE}@${tag}/avatars/${category}/${id}.png`;
}

function copyToClipboard(text: string): boolean {
  if (typeof window === "undefined") return false;
  const fullUrl = text.startsWith("http") ? text : `${window.location.origin}${text}`;

  const el = document.createElement("input");
  el.value = fullUrl;
  el.setAttribute("readonly", "");
  el.style.cssText =
    "position:fixed;left:0;top:0;width:2px;height:2px;padding:0;border:none;outline:none;opacity:0;";
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, fullUrl.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    // ignore
  }
  document.body.removeChild(el);
  return ok;
}

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16V4a2 2 0 0 1 2-2h10" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const iconButtonClass =
  "inline-flex size-8 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const success = copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    },
    [url]
  );

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={iconButtonClass}
      title="Copy URL"
      aria-label={copied ? "Copied" : "Copy URL"}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

function DownloadButton({
  url,
  filename,
}: {
  url: string;
  filename: string;
}) {
  return (
    <a
      href={url}
      download={filename}
      className={iconButtonClass}
      title="Download"
      aria-label="Download avatar"
    >
      <DownloadIcon />
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <header className="mb-14 text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Avatarverse
            </h1>
            <p className="mt-3 text-lg text-zinc-400">
              Deterministic profile avatars. Same seed, same avatar. Every time.
            </p>
          </header>

          <section className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">
                Avatar Pack
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Pre-made PNG avatars. Copy the URL for any avatar to use in your
                app.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-3 sm:grid-cols-8">
              {Array.from({ length: VOXEL_COUNT }, (_, i) => {
                const id = i + 1;
                const url = placeholderCdnUrl("voxel", id);
                const apiUrl = placeholderApiUrl("voxel", id);
                return (
                  <div
                    key={id}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <img
                      src={apiUrl}
                      alt={`Voxel avatar ${id}`}
                      width={64}
                      height={64}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <div className="flex items-center gap-1">
                      <CopyButton url={url} />
                      <DownloadButton
                        url={apiUrl}
                        filename={`avatar-${id}.png`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto border-t border-zinc-800 bg-zinc-900/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 text-sm text-zinc-400 sm:flex-row">
          <span>Avatarverse &middot; MIT License</span>
          <a
            href="https://github.com/coppermare/avatarverse"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
