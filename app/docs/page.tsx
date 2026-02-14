/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Header } from "../components/Header";

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-main py-12 sm:py-16">
          <h1 className="mb-4 text-3xl font-semibold text-zinc-200 sm:text-4xl">
            How to Use Avatarverse
          </h1>
          <p className="mb-12 text-lg text-zinc-400">
            Three ways to integrate deterministic avatars into your app.
          </p>

          {/* Quick Start */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-200">
              Quick Start
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-xl font-medium text-zinc-200">
                  1. Direct CDN (No install)
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Copy any avatar URL and drop it into an{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
                    &lt;img&gt;
                  </code>{" "}
                  tag. That&apos;s it.
                </p>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-sm text-zinc-200">
                    <code>{`<img
  src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@main/avatars/voxel/1.png"
  alt="Avatar"
  width="64"
  height="64"
/>`}</code>
                  </pre>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  Browse the{" "}
                  <Link href="/" className="underline hover:text-zinc-300">
                    homepage
                  </Link>{" "}
                  and click Copy to get the URL for any avatar.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-medium text-zinc-200">
                  2. NPM Package (Deterministic)
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Same seed always returns the same avatar. Perfect for user
                  profiles.
                </p>
                <div className="mb-4 overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-sm text-zinc-200">
                    <code>{`npm install avatarsverse`}</code>
                  </pre>
                </div>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-sm text-zinc-200">
                    <code>{`import { avatarUrl } from "avatarsverse";

// Same seed = same avatar URL
const url = avatarUrl("alice@example.com");
// → https://cdn.jsdelivr.net/.../avatars/voxel/148.jpeg

<img src={url} alt="Avatar" width={64} height={64} />`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-medium text-zinc-200">
                  3. API Endpoint
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  The Next.js app exposes an HTTP API. Available when running{" "}
                  <code className="text-zinc-300">npm run dev</code> or when
                  deployed.
                </p>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-sm text-zinc-200">
                    <code>{`GET /api/avatars
→ { "categories": { "voxel": ["1.png", ...] } }

GET /api/avatars/voxel
→ { "files": ["1.png", "2.jpeg", ...] }

GET /api/avatars/voxel/42
→ (image binary)`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Framework Examples */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-200">
              Framework Examples
            </h2>
            <div className="space-y-8">
              {/* React */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-xl font-medium text-zinc-200">React</h3>
                  <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                    Next.js / Vite
                  </span>
                </div>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-sm text-zinc-200">
                    <code>{`import { avatarUrl } from "avatarsverse";

function UserProfile({ user }) {
  return (
    <img
      src={avatarUrl(user.email)}
      alt={\`Avatar for \${user.name}\`}
      width={64}
      height={64}
      className="rounded-full"
    />
  );
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Vue */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-xl font-medium text-zinc-200">Vue</h3>
                  <span className="rounded bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                    Nuxt / Vite
                  </span>
                </div>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-sm text-zinc-200">
                    <code>{`<script setup>
import { avatarUrl } from "avatarsverse";
const props = defineProps(['user']);
const avatarSrc = avatarUrl(props.user.email);
</script>

<template>
  <img
    :src="avatarSrc"
    :alt="\`Avatar for \${user.name}\`"
    width="64"
    height="64"
    class="rounded-full"
  />
</template>`}</code>
                  </pre>
                </div>
              </div>

              {/* Vanilla HTML/JS */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-xl font-medium text-zinc-200">
                    Vanilla JavaScript
                  </h3>
                  <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">
                    No framework
                  </span>
                </div>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-sm text-zinc-200">
                    <code>{`<script type="module">
  import { avatarUrl } from "https://esm.sh/avatarsverse";

  const userEmail = "alice@example.com";
  const url = avatarUrl(userEmail);

  document.getElementById("avatar").src = url;
</script>

<img id="avatar" width="64" height="64" />`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-200">
              API Reference
            </h2>
            <div>
              <h3 className="mb-4 text-xl font-medium text-zinc-200">
                <code className="text-blue-400">avatarUrl()</code>
              </h3>
              <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                <pre className="text-sm text-zinc-200">
                  <code>{`avatarUrl(seed, category?, total?, tag?)`}</code>
                </pre>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-zinc-300">
                    Parameters
                  </h4>
                  <table className="w-full text-sm">
                    <thead className="border-b border-zinc-800">
                      <tr className="text-left text-zinc-400">
                        <th className="pb-2 pr-4 font-medium">Parameter</th>
                        <th className="pb-2 pr-4 font-medium">Type</th>
                        <th className="pb-2 pr-4 font-medium">Default</th>
                        <th className="pb-2 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-300">
                      <tr className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4">
                          <code className="text-xs text-blue-400">seed</code>
                        </td>
                        <td className="py-3 pr-4 text-zinc-400">string</td>
                        <td className="py-3 pr-4 text-zinc-500">required</td>
                        <td className="py-3 text-zinc-400">
                          Any string (username, email, ID)
                        </td>
                      </tr>
                      <tr className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4">
                          <code className="text-xs text-blue-400">
                            category
                          </code>
                        </td>
                        <td className="py-3 pr-4 text-zinc-400">string</td>
                        <td className="py-3 pr-4">
                          <code className="text-xs text-zinc-500">
                            &quot;voxel&quot;
                          </code>
                        </td>
                        <td className="py-3 text-zinc-400">Avatar category</td>
                      </tr>
                      <tr className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4">
                          <code className="text-xs text-blue-400">total</code>
                        </td>
                        <td className="py-3 pr-4 text-zinc-400">number</td>
                        <td className="py-3 pr-4">
                          <code className="text-xs text-zinc-500">
                            undefined
                          </code>
                        </td>
                        <td className="py-3 text-zinc-400">
                          Legacy mode pool size
                        </td>
                      </tr>
                      <tr className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4">
                          <code className="text-xs text-blue-400">tag</code>
                        </td>
                        <td className="py-3 pr-4 text-zinc-400">string</td>
                        <td className="py-3 pr-4">
                          <code className="text-xs text-zinc-500">
                            &quot;main&quot;
                          </code>
                        </td>
                        <td className="py-3 text-zinc-400">
                          jsDelivr tag or release version
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-zinc-300">
                    Returns
                  </h4>
                  <p className="text-sm text-zinc-400">
                    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
                      string
                    </code>{" "}
                    - A jsDelivr CDN URL pointing to the deterministic avatar
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-zinc-300">
                    Example
                  </h4>
                  <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                    <pre className="text-sm text-zinc-200">
                      <code>{`// Recommended: uses built-in manifest
avatarUrl("alice@example.com");
// → https://cdn.jsdelivr.net/.../avatars/voxel/148.jpeg

// Pin to specific release (e.g. 0.1.0)
avatarUrl("alice@example.com", "voxel", undefined, "0.1.0");
// → https://cdn.jsdelivr.net/...@0.1.0/avatars/voxel/148.jpeg`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Use Cases */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-200">
              Common Use Cases
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-zinc-200">
                  Prototypes & Mockups
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Drop consistent avatars into wireframes without generating
                  hundreds of variations.
                </p>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-xs text-zinc-200">
                    <code>{`import { avatarUrl } from "avatarsverse";

const users = [
  "alice@example.com",
  "bob@example.com",
  "charlie@example.com"
];

{users.map(email => (
  <img src={avatarUrl(email)} key={email} />
))}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-zinc-200">
                  User Profile Fallbacks
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Show deterministic avatars when users haven&apos;t uploaded a
                  profile picture yet.
                </p>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-xs text-zinc-200">
                    <code>{`import { avatarUrl } from "avatarsverse";

const src = user.avatar
  ? user.avatar
  : avatarUrl(user.id);

<img src={src} alt={user.name} />`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-zinc-200">
                  Comment Threads
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Each commenter gets a consistent avatar based on their email
                  or username.
                </p>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-xs text-zinc-200">
                    <code>{`import { avatarUrl } from "avatarsverse";

{comments.map(comment => (
  <div key={comment.id}>
    <img src={avatarUrl(comment.email)} alt={comment.author} />
    <p>{comment.text}</p>
  </div>
))}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-zinc-200">
                  Testing & Demos
                </h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Seed test data with deterministic avatars for consistent
                  screenshots and demos.
                </p>
                <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                  <pre className="text-xs text-zinc-200">
                    <code>{`import { avatarUrl } from "avatarsverse";

const testUsers = [
  { id: "test-1", ... },
  { id: "test-2", ... }
];

// Same test, same avatars (e.g. Cypress)
testUsers.forEach(user => {
  cy.get('.avatar')
    .should('have.attr', 'src')
    .and('include', avatarUrl(user.id));
});`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-200">
              Troubleshooting
            </h2>
            <div className="space-y-4">
              <details className="group rounded-lg border border-zinc-800 bg-zinc-900/50">
                <summary className="cursor-pointer p-6 text-base font-medium text-zinc-200 hover:text-zinc-100">
                  Why am I getting different avatars across devices?
                </summary>
                <div className="border-t border-zinc-800 p-6 text-sm text-zinc-400">
                  <p className="mb-2">
                    Make sure you&apos;re using the same seed value. The
                    library uses the <code className="text-zinc-300">seed</code>{" "}
                    parameter to deterministically select an avatar.
                  </p>
                  <p>
                    If the seed is consistent (e.g., user email), the avatar
                    will be the same everywhere.
                  </p>
                </div>
              </details>

              <details className="group rounded-lg border border-zinc-800 bg-zinc-900/50">
                <summary className="cursor-pointer p-6 text-base font-medium text-zinc-200 hover:text-zinc-100">
                  Can I use a specific release version?
                </summary>
                <div className="border-t border-zinc-800 p-6 text-sm text-zinc-400">
                  <p className="mb-2">
                    Yes. Pass a release tag as the 4th parameter:
                  </p>
                  <div className="overflow-x-auto rounded-md bg-zinc-900 p-4">
                    <pre className="text-xs text-zinc-200">
                      <code>{`avatarUrl("alice@example.com", "voxel", undefined, "0.1.0")`}</code>
                    </pre>
                  </div>
                  <p className="mt-2">
                    This pins to{" "}
                    <code className="text-zinc-300">
                      @0.1.0
                    </code> on jsDelivr, ensuring avatars don&apos;t change when new
                    releases are published.
                  </p>
                </div>
              </details>

              <details className="group rounded-lg border border-zinc-800 bg-zinc-900/50">
                <summary className="cursor-pointer p-6 text-base font-medium text-zinc-200 hover:text-zinc-100">
                  What if I need more than one avatar style?
                </summary>
                <div className="border-t border-zinc-800 p-6 text-sm text-zinc-400">
                  <p className="mb-2">
                    Currently, only the <code className="text-zinc-300">voxel</code> category
                    is available. More styles are planned for future releases.
                  </p>
                  <p>
                    Follow the{" "}
                    <a
                      href="https://github.com/coppermare/avatarverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      GitHub repo
                    </a>{" "}
                    to get notified when new styles are added.
                  </p>
                </div>
              </details>

              <details className="group rounded-lg border border-zinc-800 bg-zinc-900/50">
                <summary className="cursor-pointer p-6 text-base font-medium text-zinc-200 hover:text-zinc-100">
                  Are the avatars cached?
                </summary>
                <div className="border-t border-zinc-800 p-6 text-sm text-zinc-400">
                  <p className="mb-2">
                    Yes. jsDelivr provides a global CDN with aggressive caching.
                  </p>
                  <p>
                    Once an avatar is loaded, it&apos;s cached on the edge and
                    will load instantly for subsequent requests.
                  </p>
                </div>
              </details>

              <details className="group rounded-lg border border-zinc-800 bg-zinc-900/50">
                <summary className="cursor-pointer p-6 text-base font-medium text-zinc-200 hover:text-zinc-100">
                  Can I self-host the avatars?
                </summary>
                <div className="border-t border-zinc-800 p-6 text-sm text-zinc-400">
                  <p className="mb-2">
                    Yes. Clone the{" "}
                    <a
                      href="https://github.com/coppermare/avatarverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      GitHub repo
                    </a>{" "}
                    and serve the{" "}
                    <code className="text-zinc-300">avatars/</code> directory from
                    your own CDN or static file server.
                  </p>
                  <p>
                    You&apos;ll need to update the{" "}
                    <code className="text-zinc-300">CDN_BASE</code> constant in{" "}
                    <code className="text-zinc-300">index.ts</code> to point to your
                    hosting URL.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* Next Steps */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-zinc-200">
              Next Steps
            </h2>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-400">→</span>
                <span>
                  Browse the{" "}
                  <Link
                    href="/"
                    className="text-zinc-200 underline hover:text-zinc-100"
                  >
                    avatar library
                  </Link>{" "}
                  and copy URLs for your project
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-400">→</span>
                <span>
                  Check out the{" "}
                  <a
                    href="https://github.com/coppermare/avatarverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 underline hover:text-zinc-100"
                  >
                    GitHub repo
                  </a>{" "}
                  for source code and examples
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-400">→</span>
                <span>
                  Install via NPM:{" "}
                  <a
                    href="https://www.npmjs.com/package/avatarsverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 underline hover:text-zinc-100"
                  >
                    <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
                      npm install avatarsverse
                    </code>
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-400">→</span>
                <span>
                  Have questions? Open an issue on{" "}
                  <a
                    href="https://github.com/coppermare/avatarverse/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 underline hover:text-zinc-100"
                  >
                    GitHub
                  </a>
                </span>
              </li>
            </ul>
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
