"use client";

import { useState, useCallback } from "react";

const SIZES = [32, 64, 128, 256] as const;
const STYLE = "voxel";

function randomSeed(): string {
  return Math.random().toString(36).slice(2, 12);
}

function buildAvatarUrl(seed: string, size: number, radius: number): string {
  const params = new URLSearchParams({ seed, size: String(size) });
  if (radius > 0) params.set("radius", String(radius));
  return `/api/avatar/${STYLE}?${params}`;
}

export default function Playground() {
  const [seed, setSeed] = useState("alice");
  const [size, setSize] = useState(128);
  const [radius, setRadius] = useState(0);

  const avatarUrl = buildAvatarUrl(seed, size, radius);

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

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight">
            Avatarverse
          </h1>
          <p className="mt-2 text-neutral-400">
            Deterministic profile avatars. Same seed, same avatar. Every time.
          </p>
        </header>

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
              <p className="text-sm text-neutral-500">Size: {size}×{size}</p>
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
      </div>
    </main>
  );
}
