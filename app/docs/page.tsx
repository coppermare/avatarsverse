import Link from "next/link";
import { Header } from "../components/Header";
import { CodeBlock } from "../components/CodeBlock";

export const metadata = {
  title: "Docs — Avatarsverse",
  description: "How to install and use Avatarsverse in your project.",
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "api", label: "API reference" },
  { id: "faq", label: "FAQ" },
];

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-main py-12 sm:py-16">
          <div className="flex gap-16">

            {/* Sidebar nav */}
            <aside className="hidden w-44 shrink-0 lg:block">
              <nav className="sticky top-24 space-y-1">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  On this page
                </p>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="min-w-0 max-w-2xl flex-1">

              <div className="mb-12">
                <h1 className="mb-3 text-3xl font-semibold text-zinc-200 sm:text-4xl">
                  Documentation
                </h1>
                <p className="text-base text-zinc-400">
                  Avatarsverse is a free, open-source library of avatar images
                  served over a global CDN.
                </p>
              </div>

              <section id="overview" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">Overview</h2>
                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                  <p>
                    Every avatar has a permanent, stable URL on jsDelivr. You can drop
                    any URL into an{" "}
                    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">&lt;img&gt;</code>{" "}
                    tag and it will work instantly — no backend, no signup, no rate limits.
                  </p>
                  <p>
                    The NPM package adds a{" "}
                    <strong className="text-zinc-300">deterministic</strong> mapping from
                    any string to an avatar URL. Pass the same seed (email, username, user
                    ID) and you will always get the same avatar back, across devices and
                    deployments.
                  </p>
                  <p>
                    Currently one style is available: <strong className="text-zinc-300">voxel</strong>.
                    More styles are in the works — follow the{" "}
                    <a
                      href="https://github.com/coppermare/avatarsverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 underline hover:text-zinc-100"
                    >
                      GitHub repo
                    </a>{" "}
                    to get notified.
                  </p>
                </div>
              </section>

              <section id="installation" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">Installation</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  To use avatar URLs directly, there is nothing to install. Copy a URL
                  from the{" "}
                  <Link href="/" className="text-zinc-200 underline hover:text-zinc-100">
                    homepage
                  </Link>{" "}
                  and use it as-is. For the deterministic helper in a JS/TS project,
                  install the package with your preferred package manager:{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    npm install avatarsverse
                  </code>.
                </p>
              </section>

              <section id="usage" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">Usage</h2>
                <p className="mb-5 text-sm text-zinc-400 leading-relaxed">
                  Import <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">avatarUrl</code> and
                  pass any string as the seed. The function hashes the seed and returns
                  a CDN URL. A common pattern is to fall back to a deterministic avatar
                  when a user hasn&apos;t uploaded a photo yet — use{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">user.avatarUrl ?? avatarUrl(user.id)</code>.
                </p>
                <CodeBlock
                  language="ts"
                  code={`import { avatarUrl } from "avatarsverse";

const url = avatarUrl("alice@example.com");
// → always the same avatar for this seed

<img src={url} alt="Alice" width={64} height={64} />`}
                />
              </section>

              <section id="api" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">API reference</h2>
                <h3 className="mb-3 font-mono text-sm text-zinc-200">
                  avatarUrl(seed, category?, total?, tag?)
                </h3>
                <p className="mb-5 text-sm text-zinc-400 leading-relaxed">
                  Returns a jsDelivr CDN URL for the avatar deterministically selected
                  by the given seed.
                </p>
                <div className="overflow-x-auto rounded-md border border-zinc-800 text-sm">
                  <table className="w-full">
                    <thead className="border-b border-zinc-800 bg-zinc-900/60">
                      <tr className="text-left text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        <th className="px-4 py-3">Parameter</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Default</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">seed</td>
                        <td className="px-4 py-3 text-zinc-400">string</td>
                        <td className="px-4 py-3 text-zinc-600">required</td>
                        <td className="px-4 py-3 text-zinc-400">Any string used to deterministically pick an avatar</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">category</td>
                        <td className="px-4 py-3 text-zinc-400">string</td>
                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">&quot;voxel&quot;</td>
                        <td className="px-4 py-3 text-zinc-400">Avatar style to draw from</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">total</td>
                        <td className="px-4 py-3 text-zinc-400">number</td>
                        <td className="px-4 py-3 text-zinc-600">undefined</td>
                        <td className="px-4 py-3 text-zinc-400">Legacy — limits pool size; omit in new projects</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">tag</td>
                        <td className="px-4 py-3 text-zinc-400">string</td>
                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">&quot;main&quot;</td>
                        <td className="px-4 py-3 text-zinc-400">jsDelivr release tag — pin to a version to freeze avatar assignments</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-zinc-400">
                  Returns{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">string</code>{" "}
                  — a fully-qualified CDN URL.
                </p>
              </section>

              <section id="faq" className="mb-14 scroll-mt-24">
                <h2 className="mb-6 text-xl font-semibold text-zinc-200">FAQ</h2>
                <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">Why am I getting a different avatar on another device?</p>
                    <p>
                      The seed must be exactly the same. Pick one stable identifier per
                      user (e.g. a user ID) and use it consistently.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">Will avatars change if I update the package?</p>
                    <p>
                      They can. The avatar selected for a seed is determined by the
                      manifest bundled inside the package. If a new version adds avatars
                      to the pack, the mapping shifts. To freeze assignments, pin both
                      your package version in <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">package.json</code> and
                      pass the matching release tag as the fourth argument so the CDN URL
                      stays consistent too:
                    </p>
                    <div className="mt-3">
                      <CodeBlock
                        language="ts"
                        code={`avatarUrl("alice@example.com", "voxel", undefined, "0.1.0")`}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">Is there a rate limit or cost?</p>
                    <p>
                      No. Avatarsverse is released under the{" "}
                      <strong className="text-zinc-300">MIT license</strong> — free for
                      personal and commercial use. Images are served via jsDelivr, a free
                      public CDN with no rate limits for reasonable use.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">Can I self-host?</p>
                    <p>
                      Yes. Clone the{" "}
                      <a
                        href="https://github.com/coppermare/avatarsverse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-200 underline hover:text-zinc-100"
                      >
                        GitHub repo
                      </a>{" "}
                      and serve the{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">avatars/</code>{" "}
                      folder from your own CDN. Update the{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">CDN_BASE</code>{" "}
                      constant in{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">index.ts</code>{" "}
                      to point to your URL.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">Will more avatar styles be added?</p>
                    <p>
                      Yes, more packs are planned. Watch the{" "}
                      <a
                        href="https://github.com/coppermare/avatarsverse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-200 underline hover:text-zinc-100"
                      >
                        GitHub repo
                      </a>{" "}
                      for releases.
                    </p>
                  </div>

                </div>
              </section>

              <div className="border-t border-zinc-800 pt-8">
                <p className="mb-4 text-sm font-semibold text-zinc-200">Links</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>
                    <Link href="/" className="underline hover:text-zinc-200">
                      Browse avatar library
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/coppermare/avatarsverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-zinc-200"
                    >
                      GitHub repo
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.npmjs.com/package/avatarsverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-zinc-200"
                    >
                      NPM package
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
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
