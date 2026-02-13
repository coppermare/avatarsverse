# Avatarverse

Deterministic profile avatar library. Same seed, same avatar. Every time.

Pre-made voxel-style PNG avatars for mockups, prototypes, and placeholders. Use any string as a seed (username, email, ID) and get the same avatar URL across all platforms.

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

Replace `1` with `1`–`15` for different avatars. Use `@main` for latest, or `@1.0.0` to pin to a release.

### 2. NPM package (seed → URL)

```bash
npm install avatarverse
```

```javascript
import { avatarUrl } from "avatarverse";

// Same seed always returns the same URL
const url = avatarUrl("alice@example.com");
// → https://cdn.jsdelivr.net/gh/coppermare/avatarverse@main/avatars/voxel/7.png
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

| Parameter | Type   | Default  | Description                                  |
|-----------|--------|----------|----------------------------------------------|
| `seed`    | string | required | Any string (username, email, ID)              |
| `category`| string | `"voxel"`| Avatar category                               |
| `total`   | number | `15`     | Number of avatars in category                 |
| `tag`     | string | `"main"` | jsDelivr tag: `"main"` or release e.g. `"1.0.0"` |

---

## Playground

Run locally to preview avatars and copy URLs:

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Avatars Pack

Pre-made PNG avatars in `avatars/voxel/` (1.png–15.png).

- **Structure**: [avatars/README.md](avatars/README.md)
- **Naming**: [avatars/NAMING_EXAMPLES.md](avatars/NAMING_EXAMPLES.md)

---

## License

MIT. See [LICENSE](LICENSE).
