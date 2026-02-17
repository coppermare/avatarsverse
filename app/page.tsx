"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";

/** Images above this index load eagerly for fast LCP; rest use lazy loading */
const ABOVE_FOLD_COUNT = 8;
const CDN_BASE = "https://cdn.jsdelivr.net/gh/coppermare/avatarsverse";

function avatarUrl(category: string, filename: string, tag = "main"): string {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return `/api/avatars/${category}/${filename}`;
  }
  return `${CDN_BASE}@${tag}/avatars/${category}/${filename}`;
}

function cdnUrl(category: string, filename: string, tag = "main"): string {
  return `${CDN_BASE}@${tag}/avatars/${category}/${filename}`;
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
  "inline-flex size-9 w-full min-w-0 items-center justify-center rounded-md bg-zinc-800 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const AvatarSkeleton = () => (
  <div className="flex w-full flex-col gap-1.5">
    <div className="avatar-tile aspect-square w-full animate-pulse rounded-lg bg-zinc-800" />
    <div className="grid w-full grid-cols-2 gap-1">
      <div className="h-9 w-full animate-pulse rounded-md bg-zinc-800" />
      <div className="h-9 w-full animate-pulse rounded-md bg-zinc-800" />
    </div>
  </div>
);

function AvatarTile({
  src,
  alt,
  copyUrl,
  displayUrl,
  filename,
  eagerLoad,
}: {
  src: string;
  alt: string;
  copyUrl: string;
  displayUrl: string;
  filename: string;
  eagerLoad: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="avatar-tile relative aspect-square w-full overflow-hidden rounded-lg">
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse bg-zinc-800"
            aria-hidden
          />
        )}
        <img
          src={src}
          alt={alt}
          width={96}
          height={96}
          loading={eagerLoad ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`aspect-square w-full rounded-lg object-cover transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-1">
        <CopyButton url={copyUrl} />
        <DownloadButton url={displayUrl} filename={filename} />
      </div>
    </div>
  );
}

const NPM_COMMAND = "npm install avatarsverse";

function NpmCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(NPM_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      title="Copy command"
      aria-label={copied ? "Copied" : "Copy command"}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

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

type CategoriesData = Record<string, string[]>;

export default function HomePage() {
  const [categories, setCategories] = useState<CategoriesData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/avatars")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load"))))
      .then((data: { categories: CategoriesData }) => setCategories(data.categories ?? {}))
      .catch(() => setError("Could not load avatars"))
      .finally(() => setLoading(false));
  }, []);

  const categoryEntries = Object.entries(categories).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  const totalCount = categoryEntries.reduce(
    (sum, [, files]) => sum + files.length,
    0
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-main py-12 sm:py-16">
          <h1 className="mb-4 text-2xl font-semibold text-zinc-200 sm:text-3xl">
            {loading
              ? "Generate unique profile avatars"
              : `${totalCount.toLocaleString()} profile avatars ready to use`}
            {loading && (
              <span className="font-normal text-zinc-500"> Loading...</span>
            )}
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-zinc-400">
            Avatarsverse is an open-source library that generates deterministic avatar URLs from usernames, emails, or any random strings. Same seed, same avatar. Every time. Perfect for developers seeking a modern, scalable solution to enhance user profiles without the complexity of managing image uploads or dealing with generic placeholder icons.
          </p>

          <div className="mb-12 inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
            <pre className="flex-1 text-sm text-zinc-300">
              <code>npm install avatarsverse</code>
            </pre>
            <NpmCopyButton />
          </div>

          <section className="space-y-12">
            {loading ? (
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {Array.from({ length: 24 }, (_, i) => (
                  <AvatarSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <p className="text-sm text-zinc-500">{error}</p>
            ) : categoryEntries.length === 0 ? (
              <p className="text-sm text-zinc-500">No avatars found.</p>
            ) : (
              categoryEntries.map(([category, files]) => {
                const uniqueFiles = [...new Set(files)];
                return (
                  <div key={category} className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                    {uniqueFiles.map((filename, i) => {
                      const displayUrl = avatarUrl(category, filename);
                      const src = `${displayUrl}${displayUrl.includes("?") ? "&" : "?"}v=${encodeURIComponent(filename)}`;
                      const copyUrl = cdnUrl(category, filename);
                      const label = filename.replace(/\.[^.]+$/, "");
                      const eagerLoad =
                        categoryEntries.findIndex(([c]) => c === category) ===
                          0 && i < ABOVE_FOLD_COUNT;
                      return (
                        <AvatarTile
                          key={`${category}-${filename}`}
                          src={src}
                          alt={`${category} avatar ${label}`}
                          copyUrl={copyUrl}
                          displayUrl={displayUrl}
                          filename={filename}
                          eagerLoad={eagerLoad}
                        />
                      );
                    })}
                  </div>
                );
              })
            )}
          </section>
        </div>
      </main>

      <footer className="mt-auto border-t border-zinc-800 bg-zinc-900/50 py-8">
        <div className="container-main flex flex-col items-center justify-between gap-4 text-sm text-zinc-400 sm:flex-row">
          <span>
            All rights reserved © 2026. Made by{" "}
            <a
              href="https://kristikumrija.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-zinc-300"
            >
              Kristi Kumrija
            </a>
          </span>
          <a
            href="https://github.com/coppermare/avatarsverse"
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
