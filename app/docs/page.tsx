import Link from "next/link";
import { Header } from "../components/Header";
import { CodeBlock } from "../components/CodeBlock";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "Docs — Avatarsverse",
  description: "How to install and use Avatarsverse in your project.",
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "nextjs", label: "Next.js" },
  { id: "api", label: "Package API" },
  { id: "http-api", label: "HTTP API" },
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
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">
                  Overview
                </h2>
                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                  <p>
                    Every avatar is available directly from jsDelivr. The{" "}
                    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                      @main
                    </code>{" "}
                    URL tracks the latest repository state. For stable
                    production URLs, replace it with an existing Git release
                    tag. You can drop the URL into an{" "}
                    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                      &lt;img&gt;
                    </code>{" "}
                    tag without running an image backend.
                  </p>
                  <p>
                    The NPM package adds a{" "}
                    <strong className="text-zinc-300">deterministic</strong>{" "}
                    mapping from any string to an avatar URL. Pass the same seed
                    (email, username, user ID) and you will always get the same
                    avatar back, across devices and deployments.
                  </p>
                  <p>
                    Currently one style is available:{" "}
                    <strong className="text-zinc-300">voxel</strong>. More
                    styles are in the works — follow the{" "}
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
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">
                  Installation
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                  To use avatar URLs directly, there is nothing to install. Copy
                  a URL from the{" "}
                  <Link
                    href="/"
                    className="text-zinc-200 underline hover:text-zinc-100"
                  >
                    homepage
                  </Link>{" "}
                  and use it as-is. For the deterministic helper in a JS/TS
                  project, install the package with your preferred package
                  manager:{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    npm install avatarsverse
                  </code>
                  .
                </p>
                <CodeBlock
                  language="html"
                  code={`<img
  src="https://cdn.jsdelivr.net/gh/coppermare/avatarsverse@main/avatars/voxel/1.jpeg"
  alt="Avatar"
  width="64"
  height="64"
/>`}
                />
              </section>

              <section id="usage" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">
                  Usage
                </h2>
                <p className="mb-5 text-sm text-zinc-400 leading-relaxed">
                  Import{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    avatarUrl
                  </code>{" "}
                  and pass any string as the seed. The function hashes the seed
                  and returns a CDN URL. A common pattern is to fall back to a
                  deterministic avatar when a user hasn&apos;t uploaded a photo
                  yet — use{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    user.avatarUrl ?? avatarUrl(user.id)
                  </code>
                  .
                </p>
                <CodeBlock
                  language="ts"
                  code={`import { avatarUrl } from "avatarsverse";

const url = avatarUrl("alice@example.com");
// → always the same avatar for this seed

<img src={url} alt="Alice" width={64} height={64} />`}
                />
              </section>

              <section id="nextjs" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">
                  Next.js
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                  When using the optimized Next.js Image component, allow the
                  jsDelivr hostname in your image configuration:
                </p>
                <CodeBlock
                  language="ts"
                  code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
  },
};

export default nextConfig;`}
                />
                <div className="mt-5">
                  <CodeBlock
                    language="tsx"
                    code={`import Image from "next/image";
import { avatarUrl } from "avatarsverse";

<Image
  src={avatarUrl(user.id)}
  alt={\`Avatar for \${user.name}\`}
  width={64}
  height={64}
/>`}
                  />
                </div>
              </section>

              <section id="api" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">
                  Package API
                </h2>
                <h3 className="mb-3 font-mono text-sm text-zinc-200">
                  avatarUrl(seed, category?, total?, tag?)
                </h3>
                <p className="mb-5 text-sm text-zinc-400 leading-relaxed">
                  Returns a jsDelivr CDN URL for the avatar deterministically
                  selected by the given seed.
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
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">
                          seed
                        </td>
                        <td className="px-4 py-3 text-zinc-400">string</td>
                        <td className="px-4 py-3 text-zinc-600">required</td>
                        <td className="px-4 py-3 text-zinc-400">
                          Any string used to deterministically pick an avatar
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">
                          category
                        </td>
                        <td className="px-4 py-3 text-zinc-400">string</td>
                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                          &quot;voxel&quot;
                        </td>
                        <td className="px-4 py-3 text-zinc-400">
                          Avatar style to draw from
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">
                          total
                        </td>
                        <td className="px-4 py-3 text-zinc-400">number</td>
                        <td className="px-4 py-3 text-zinc-600">undefined</td>
                        <td className="px-4 py-3 text-zinc-400">
                          Limits selection to the first N files in the category
                          manifest
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-xs text-blue-400">
                          tag
                        </td>
                        <td className="px-4 py-3 text-zinc-400">string</td>
                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                          &quot;main&quot;
                        </td>
                        <td className="px-4 py-3 text-zinc-400">
                          jsDelivr release tag — pin to a version to freeze
                          avatar assignments
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-zinc-400">
                  Returns{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    string
                  </code>{" "}
                  — a fully-qualified CDN URL.
                </p>
                <p className="mt-3 text-sm text-zinc-500">
                  The function throws when the seed is empty, the category does
                  not exist, or the pool limit is outside the available range.
                </p>
                <h3 className="mb-3 mt-8 font-mono text-sm text-zinc-200">
                  cyrb53(value, seed?)
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Returns a deterministic numeric hash. The optional numeric
                  seed defaults to zero. This low-level export powers avatar
                  selection; most applications should use{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    avatarUrl
                  </code>{" "}
                  instead.
                </p>
              </section>

              <section id="http-api" className="mb-14 scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-zinc-200">
                  HTTP API
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                  The Next.js app exposes read-only endpoints for self-hosted
                  deployments. All routes accept{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    GET
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    OPTIONS
                  </code>{" "}
                  and return permissive CORS headers.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-mono text-sm text-zinc-200">
                      GET /api/avatars
                    </h3>
                    <p className="mb-3 text-sm text-zinc-400">
                      Lists every category and its filenames.
                    </p>
                    <CodeBlock
                      language="json"
                      code={`{
  "categories": {
    "voxel": ["1.jpeg", "2.png"]
  }
}`}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 font-mono text-sm text-zinc-200">
                      GET /api/avatars/:category
                    </h3>
                    <p className="mb-3 text-sm text-zinc-400">
                      Lists filenames for one category.
                    </p>
                    <CodeBlock
                      language="json"
                      code={`{ "files": ["1.jpeg", "2.png"] }`}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 font-mono text-sm text-zinc-200">
                      GET /api/avatars/:category/:id
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-zinc-400">
                      Returns the image bytes with the detected PNG or JPEG
                      content type. The ID may include its extension, such as{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                        /api/avatars/voxel/1.jpeg
                      </code>
                      , or omit it, such as{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                        /api/avatars/voxel/1
                      </code>
                      . Add{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                        ?download=1
                      </code>{" "}
                      to receive it as a file attachment.
                    </p>
                    <CodeBlock
                      language="ts"
                      code={`const response = await fetch("/api/avatars/voxel/1");
const image = await response.blob();

// Direct file download
const downloadUrl = "/api/avatars/voxel/1?download=1";`}
                    />
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                  Manifest responses are cached for five minutes with stale
                  revalidation. Image responses are cached immutably for one
                  year. Missing categories and images return HTTP 404 with{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                    {`{ "error": { "code": "not_found", "message": "..." } }`}
                  </code>
                  .
                </p>
              </section>

              <section id="faq" className="mb-14 scroll-mt-24">
                <h2 className="mb-6 text-xl font-semibold text-zinc-200">
                  FAQ
                </h2>
                <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">
                  <div>
                    <p className="mb-2 font-medium text-zinc-200">
                      Why am I getting a different avatar on another device?
                    </p>
                    <p>
                      The seed must be exactly the same. Pick one stable
                      identifier per user (e.g. a user ID) and use it
                      consistently.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">
                      Will avatars change if I update the package?
                    </p>
                    <p>
                      They can. The avatar selected for a seed is determined by
                      the manifest bundled inside the package. If a new version
                      adds avatars to the pack, the mapping shifts. To freeze
                      assignments, pin both your package version in{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                        package.json
                      </code>{" "}
                      and pass the matching release tag as the fourth argument
                      so the CDN URL stays consistent too:
                    </p>
                    <div className="mt-3">
                      <CodeBlock
                        language="ts"
                        code={`avatarUrl(
  "alice@example.com",
  "voxel",
  undefined,
  "<existing-release-tag>"
)`}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">
                      Is there a rate limit or cost?
                    </p>
                    <p>
                      Avatarsverse has no account requirement or usage fee and
                      is released under the{" "}
                      <strong className="text-zinc-300">MIT license</strong> —
                      free for personal and commercial use. Image delivery is
                      provided by jsDelivr and remains subject to its service
                      and fair-use policies.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">
                      Can I self-host?
                    </p>
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
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                        avatars/
                      </code>{" "}
                      folder from your own CDN. Update the{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                        CDN_BASE
                      </code>{" "}
                      constant in{" "}
                      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                        index.ts
                      </code>{" "}
                      to point to your URL.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 font-medium text-zinc-200">
                      Will more avatar styles be added?
                    </p>
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
                <p className="mb-4 text-sm font-semibold text-zinc-200">
                  Links
                </p>
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

      <Footer />
    </div>
  );
}
