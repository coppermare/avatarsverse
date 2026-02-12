"use client";

import { useState, useCallback } from "react";

const SIZES = [32, 64, 128, 256] as const;
const STYLE = "voxel";
const VOXEL_COUNT = 15;
const CDN_BASE = "https://cdn.jsdelivr.net/gh/coppermare/avatarverse";

function randomSeed(): string {
  return Math.random().toString(36).slice(2, 12);
}

function buildAvatarUrl(seed: string, size: number, radius: number): string {
  const params = new URLSearchParams({ seed, size: String(size) });
  if (radius > 0) params.set("radius", String(radius));
  return `/api/avatar/${STYLE}?${params}`;
}

function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function getPlaceholderIndex(seed: string, count: number): number {
  return (cyrb53(seed) % count) + 1;
}

function placeholderApiUrl(category: string, id: number): string {
  return `/api/avatars/${category}/${id}`;
}

function placeholderCdnUrl(category: string, id: number, tag = "main"): string {
  return `${CDN_BASE}@${tag}/avatars/${category}/${id}.png`;
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState<"generated" | "placeholders">(
    "generated"
  );
  const [seed, setSeed] = useState("alice");
  const [size, setSize] = useState(128);
  const [radius, setRadius] = useState(0);
  const [placeholderSeed, setPlaceholderSeed] = useState("user@example.com");

  const avatarUrl = buildAvatarUrl(seed, size, radius);
  const placeholderIndex = getPlaceholderIndex(placeholderSeed, VOXEL_COUNT);
  const placeholderUrl = placeholderApiUrl("voxel", placeholderIndex);
  const placeholderCdn = placeholderCdnUrl("voxel", placeholderIndex);

  const handleRandomize = useCallback(() => {
    setSeed(randomSeed());
  }, []);

  const handleCopyUrl = useCallback(async () => {
    const fullUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${avatarUrl}`
        : avatarUrl;
    await navigator.clipboard.writeText(fullUrl);
  }, [avatarUrl]);

  const handleCopyPlaceholderUrl = useCallback(async () => {
    await navigator.clipboard.writeText(placeholderCdn);
  }, [placeholderCdn]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Avatarverse</h1>
          <p className="mt-2 text-neutral-400">
            Deterministic profile avatars. Same seed, same avatar. Every time.
          </p>
        </header>

        <div className="flex gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("generated")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "generated"
                ? "bg-indigo-600 text-white"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            Generated (SVG)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("placeholders")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "placeholders"
                ? "bg-indigo-600 text-white"
                : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            }`}
          >
            Placeholders (PNG)
          </button>
        </div>

        {activeTab === "generated" && (
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <section className="flex-shrink-0">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 flex flex-col items-center gap-4">
                <img
                  src={avatarUrl}
                  alt={`Avatar for ${seed}`}
                  width={size}
                  height={size}
                  className="rounded-lg"
                />
                <p className="text-sm text-neutral-500">
                  Size: {size}×{size}
                </p>
              </div>
            </section>

            <section className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Seed
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value || "default")}
                    placeholder="username, email, or any string"
                    className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={handleRandomize}
                    className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition"
                  >
                    Random
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Size
                </label>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        size === s
                          ? "bg-indigo-600 text-white"
                          : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Corner radius (0–50)
                </label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <p className="text-sm text-neutral-500 mt-1">{radius}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Avatar URL
                </label>
                <div className="flex gap-2">
                  <code className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-400 overflow-x-auto">
                    {typeof window !== "undefined"
                      ? `${window.location.origin}${avatarUrl}`
                      : avatarUrl}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "placeholders" && (
          <div className="space-y-8">
            <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <h2 className="text-lg font-semibold mb-4">Deterministic pick</h2>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <img
                    src={placeholderUrl}
                    alt={`Placeholder avatar for ${placeholderSeed}`}
                    width={128}
                    height={128}
                    className="rounded-lg"
                  />
                  <p className="text-sm text-neutral-500 mt-2">
                    Seed &quot;{placeholderSeed}&quot; → #{placeholderIndex}
                  </p>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Seed
                    </label>
                    <input
                      type="text"
                      value={placeholderSeed}
                      onChange={(e) => setPlaceholderSeed(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 placeholder-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      CDN URL (copy for integration)
                    </label>
                    <div className="flex gap-2">
                      <code className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-400 overflow-x-auto truncate">
                        {placeholderCdn}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyPlaceholderUrl}
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <h2 className="text-lg font-semibold mb-4">
                Voxel pack (15 avatars)
              </h2>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                {Array.from({ length: VOXEL_COUNT }, (_, i) => i + 1).map(
                  (n) => (
                    <a
                      key={n}
                      href={placeholderCdnUrl("voxel", n)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg overflow-hidden border border-neutral-700 hover:border-indigo-500 transition"
                    >
                      <img
                        src={placeholderApiUrl("voxel", n)}
                        alt={`Voxel avatar ${n}`}
                        width={64}
                        height={64}
                        className="w-full aspect-square object-cover"
                      />
                      <p className="text-xs text-neutral-500 text-center py-1">
                        {n}
                      </p>
                    </a>
                  )
                )}
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Use CDN:{" "}
                <code className="text-neutral-400">
                  {CDN_BASE}@main/avatars/voxel/1.png
                </code>{" "}
                –{" "}
                <code className="text-neutral-400">
                  {CDN_BASE}@main/avatars/voxel/15.png
                </code>
              </p>
            </section>
          </div>
        )}

        {activeTab === "generated" && (
          <section className="mt-12 p-6 rounded-xl border border-neutral-800 bg-neutral-900">
            <h2 className="text-lg font-semibold mb-4">Quick integration</h2>
            <pre className="text-sm text-neutral-400 overflow-x-auto">
              {`<img
  src="${typeof window !== "undefined" ? window.location.origin : "https://your-domain.com"}${avatarUrl}"
  alt="Avatar"
  width="${size}"
  height="${size}"
/>`}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
