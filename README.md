# Avatarsverse

[![npm](https://img.shields.io/npm/v/avatarsverse)](https://www.npmjs.com/package/avatarsverse)

Deterministic profile avatar library. Same seed, same avatar. Every time.

Pre-made voxel-style avatars for mockups, prototypes, and placeholders. Use any string as a seed (username, email, ID) and get the same avatar URL across all platforms.

---

## Quick Start

### 1. CDN (no install)

Use the avatar URL directly in an `<img>` tag:

```html
<img
  src="https://cdn.jsdelivr.net/gh/coppermare/avatarsverse@main/avatars/voxel/1.jpeg"
  alt="Avatar"
  width="64"
  height="64"
/>
```

Replace the filename with any entry from `avatars/avatars.json`. `@main` tracks the latest repository state. For a stable production URL, replace it with an existing Git release tag.

### 2. NPM package (seed → URL)

```bash
npm install avatarsverse
```

```javascript
import { avatarUrl } from "avatarsverse";

// Same seed always returns the same URL
const url = avatarUrl("alice@example.com");
// -> https://cdn.jsdelivr.net/gh/coppermare/avatarsverse@main/avatars/voxel/<deterministic-file>
```

```jsx
// React
<img
  src={avatarUrl(seed)}
  alt={`Avatar for ${userName}`}
  width={64}
  height={64}
/>
```

### Next.js

Allow jsDelivr when using the optimized Next.js Image component:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.jsdelivr.net" }],
  },
};

export default nextConfig;
```

```tsx
import Image from "next/image";
import { avatarUrl } from "avatarsverse";

<Image
  src={avatarUrl(user.id)}
  alt={`Avatar for ${user.name}`}
  width={64}
  height={64}
/>;
```

---

## API Reference

### `avatarUrl(seed, category?, total?, tag?)`

Get a deterministic avatar URL from a seed.

| Parameter  | Type   | Default     | Description                                                                                |
| ---------- | ------ | ----------- | ------------------------------------------------------------------------------------------ |
| `seed`     | string | required    | Any string (username, email, ID)                                                           |
| `category` | string | `"voxel"`   | Avatar category                                                                            |
| `total`    | number | `undefined` | Optional pool-size limit. Selection uses the first `total` files in the category manifest. |
| `tag`      | string | `"main"`    | jsDelivr branch or an existing Git release tag                                             |

```ts
import { avatarUrl } from "avatarsverse";

// Recommended: manifest-aware mode (safe with mixed extensions)
avatarUrl("alice@example.com");
// -> https://cdn.jsdelivr.net/gh/coppermare/avatarsverse@main/avatars/voxel/148.jpeg

// Optional explicit pool limit
avatarUrl("alice@example.com", "voxel", 15, "<existing-release-tag>");
// -> a deterministic URL from the first 15 voxel avatars
```

### `cyrb53(value, seed?)`

Returns the deterministic numeric hash used internally for avatar selection. The optional numeric seed defaults to `0`. Most applications should use `avatarUrl()` instead.

---

## Avatar Files (for maintainers)

- Avatars live under `avatars/{category}/` (currently `avatars/voxel/`).
- Supported file extensions: `.png`, `.jpg`, `.jpeg`.
- Use numeric file names where possible (`1.png`, `2.jpeg`, `3.png`, ...).
- After adding/removing avatar files, always run:

```bash
npm run generate-avatars
```

This updates:

- `avatars/avatars.json` (runtime/public manifest)
- `avatar-manifest.ts` (library build-time manifest)

---

## HTTP API (for external apps)

Run locally (`npm run dev`) or deploy the Next app.

- `GET /api/avatars`
  - Returns `{ categories: { [category]: string[] } }`
- `GET /api/avatars/{category}`
  - Returns `{ files: string[] }`
- `GET /api/avatars/{category}/{id}`
  - Returns image bytes with a detected PNG or JPEG content type.
  - The ID may include `.png`, `.jpg`, or `.jpeg`, or omit the extension.
  - Add `?download=1` to receive `Content-Disposition: attachment`.

```javascript
const categories = await fetch("/api/avatars").then((response) =>
  response.json()
);

const image = await fetch("/api/avatars/voxel/1").then((response) =>
  response.blob()
);

const downloadUrl = "/api/avatars/voxel/1?download=1";
```

All routes support `GET` and `OPTIONS` and include permissive CORS headers. Manifest responses use a five-minute public cache with stale revalidation; image responses use a one-year immutable cache. Missing categories and images return HTTP 404 with a structured JSON error:

```json
{
  "error": {
    "code": "not_found",
    "message": "Avatar not found."
  }
}
```

---

## Playground

Run locally to preview avatars and copy URLs:

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Development Checklist

Before opening a PR or publishing:

- `npm run generate-avatars`
- `npm run check`

---

## Contributing & Security

- Open bugs/features in GitHub Issues.
- For security vulnerabilities, do not open public issues. Use GitHub Security Advisories for private reporting.

---

## License

MIT. See [LICENSE](LICENSE).
