# Avatarverse

[![npm](https://img.shields.io/npm/v/avatarsverse)](https://www.npmjs.com/package/avatarsverse)

Deterministic profile avatar library. Same seed, same avatar. Every time.

Pre-made voxel-style avatars for mockups, prototypes, and placeholders. Use any string as a seed (username, email, ID) and get the same avatar URL across all platforms.

---

## Quick Start

### 1. CDN (no install)

Use the avatar URL directly in an `<img>` tag:

```html
<img
  src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@main/avatars/voxel/1.png"
  alt="Avatar"
  width="64"
  height="64"
/>
```

Replace the filename with any entry from `avatars/avatars.json`. Use `@main` for latest, or `@1.0.0` (recommended) to pin to a release.

### 2. NPM package (seed → URL)

```bash
npm install avatarsverse
```

```javascript
import { avatarUrl } from "avatarsverse";

// Same seed always returns the same URL
const url = avatarUrl("alice@example.com");
// -> https://cdn.jsdelivr.net/gh/coppermare/avatarverse@main/avatars/voxel/<deterministic-file>
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

---

## API Reference

### `avatarUrl(seed, category?, total?, tag?)`

Get a deterministic avatar URL from a seed.

| Parameter | Type   | Default  | Description |
|-----------|--------|----------|-------------|
| `seed`    | string | required | Any string (username, email, ID) |
| `category`| string | `"voxel"`| Avatar category |
| `total`   | number | `undefined` | Optional legacy mode. If provided, URL format is `{n}.png` from `1..total`. If omitted, Avatarverse uses the built-in manifest and returns a real filename with extension. |
| `tag`     | string | `"main"` | jsDelivr tag: `"main"` or pinned release such as `"1.0.0"` |

```ts
import { avatarUrl } from "avatarsverse";

// Recommended: manifest-aware mode (safe with mixed extensions)
avatarUrl("alice@example.com");
// -> https://cdn.jsdelivr.net/gh/coppermare/avatarverse@main/avatars/voxel/148.jpeg

// Legacy explicit pool mode
avatarUrl("alice@example.com", "voxel", 15, "1.0.0");
// -> https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/7.png
```

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
  - Returns image binary (supports `.png`, `.jpg`, `.jpeg` and id without extension)

All routes include CORS headers and structured JSON errors:

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
- `npm run lint`
- `npm test`
- `npm run build:lib`
- `npm run build`

---

## Contributing & Security

- Open bugs/features in GitHub Issues.
- For security vulnerabilities, do not open public issues. Use GitHub Security Advisories for private reporting.

---

## License

MIT. See [LICENSE](LICENSE).
