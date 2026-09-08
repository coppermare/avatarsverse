"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AvatarLightbox,
  type LightboxAvatar,
} from "./components/AvatarLightbox";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

/** Images above this index load eagerly for fast LCP; rest use lazy loading */
const ABOVE_FOLD_COUNT = 8;
const AVATAR_BATCH_SIZE = 24;
const CDN_BASE = "https://cdn.jsdelivr.net/gh/coppermare/avatarsverse";

function avatarUrl(category: string, filename: string, tag = "main"): string {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return `/api/avatars/${category}/${filename}`;
  }
  return `${CDN_BASE}@${tag}/avatars/${category}/${filename}`;
}

function cdnUrl(category: string, filename: string, tag = "main"): string {
  return `${CDN_BASE}@${tag}/avatars/${category}/${filename}`;
}

function copyToClipboard(text: string): boolean {
  if (typeof window === "undefined") return false;
  const fullUrl = text.startsWith("http")
    ? text
    : `${window.location.origin}${text}`;

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
  category,
  filename,
  eagerLoad,
  onOpen,
}: {
  src: string;
  alt: string;
  copyUrl: string;
  category: string;
  filename: string;
  eagerLoad: boolean;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <button
        aria-label={`Open ${alt} preview`}
        className="avatar-tile relative aspect-square w-full overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={onOpen}
        type="button"
      >
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse bg-zinc-800"
            aria-hidden
          />
        )}
        <Image
          src={src}
          alt={alt}
          width={96}
          height={96}
          priority={eagerLoad}
          sizes="(min-width: 1024px) 120px, (min-width: 768px) 17vw, (min-width: 640px) 22vw, 30vw"
          unoptimized
          onLoad={() => setLoaded(true)}
          className={`aspect-square w-full rounded-lg object-cover transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>
      <div className="grid w-full grid-cols-2 gap-1">
        <CopyButton url={copyUrl} />
        <DownloadButton category={category} filename={filename} />
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
  category,
  filename,
}: {
  category: string;
  filename: string;
}) {
  const downloadUrl = `/api/avatars/${encodeURIComponent(category)}/${encodeURIComponent(filename)}?download=1`;

  return (
    <a
      href={downloadUrl}
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

interface GalleryAvatar extends LightboxAvatar {
  category: string;
  copyUrl: string;
  filename: string;
}

function LazyInfiniteAvatarGrid({
  avatars,
  onOpen,
}: {
  avatars: GalleryAvatar[];
  onOpen: (index: number) => void;
}) {
  const [visibleCount, setVisibleCount] = useState(AVATAR_BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < avatars.length;

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    if (!hasMore || !loadMoreElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setVisibleCount((count) =>
          Math.min(count + AVATAR_BATCH_SIZE, avatars.length)
        );
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(loadMoreElement);
    return () => observer.disconnect();
  }, [avatars.length, hasMore, visibleCount]);

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {avatars.slice(0, visibleCount).map((avatar, index) => (
        <AvatarTile
          alt={avatar.alt}
          category={avatar.category}
          copyUrl={avatar.copyUrl}
          eagerLoad={index < ABOVE_FOLD_COUNT}
          filename={avatar.filename}
          key={`${avatar.category}-${avatar.filename}`}
          onOpen={() => onOpen(index)}
          src={avatar.src}
        />
      ))}

      {hasMore && (
        <>
          {Array.from({ length: 6 }, (_, index) => (
            <AvatarSkeleton key={`loading-${index}`} />
          ))}
          <div aria-hidden className="col-span-full h-px" ref={loadMoreRef} />
          <p aria-live="polite" className="sr-only">
            Showing {visibleCount} of {avatars.length} avatars
          </p>
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  const [categories, setCategories] = useState<CategoriesData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetch("/api/avatars")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error("Failed to load"))
      )
      .then((data: { categories: CategoriesData }) =>
        setCategories(data.categories ?? {})
      )
      .catch(() => setError("Could not load avatars"))
      .finally(() => setLoading(false));
  }, []);

  const avatars = useMemo<GalleryAvatar[]>(
    () =>
      Object.entries(categories)
        .sort(([a], [b]) => a.localeCompare(b))
        .flatMap(([category, files]) =>
          files.map((filename) => {
            const displayUrl = avatarUrl(category, filename);
            const label = filename.replace(/\.[^.]+$/, "");

            return {
              alt: `${category} avatar ${label}`,
              category,
              copyUrl: cdnUrl(category, filename),
              filename,
              src: `${displayUrl}?v=${encodeURIComponent(filename)}`,
            };
          })
        ),
    [categories]
  );
  const closeLightbox = useCallback(() => setSelectedAvatarIndex(null), []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section>
          <div className="container-main py-14 sm:py-20">
            <h1 className="mb-4 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              Deterministic avatars, ready to use.
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Choose from a growing collection of voxel avatars, or use any
              string as a seed to get the same result every time.
            </p>

            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
              <pre className="flex-1 text-sm text-zinc-300">
                <code>npm install avatarsverse</code>
              </pre>
              <NpmCopyButton />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="avatar-library-title"
          className="bg-zinc-950/30"
        >
          <div className="container-main py-12 sm:py-16">
            <h2 className="sr-only" id="avatar-library-title">
              Avatar library
            </h2>
            {loading ? (
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {Array.from({ length: 24 }, (_, i) => (
                  <AvatarSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <p className="text-sm text-zinc-500">{error}</p>
            ) : avatars.length === 0 ? (
              <p className="text-sm text-zinc-500">No avatars found.</p>
            ) : (
              <LazyInfiniteAvatarGrid
                avatars={avatars}
                onOpen={setSelectedAvatarIndex}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />

      {selectedAvatarIndex !== null && (
        <AvatarLightbox
          avatars={avatars}
          initialIndex={selectedAvatarIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
