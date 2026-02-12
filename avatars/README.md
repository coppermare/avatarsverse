# Avatarverse Avatars

Open-source avatar pack for mockups, prototypes, and placeholders. Use in design tools, demos, and staging environments.

**License**: MIT (same as Avatarverse)

---

## Categories

Avatars are organized by style in subfolders:

| Category | Path | Description |
|----------|------|-------------|
| voxel | `avatars/voxel/` | Blocky, voxel-style avatars |

Add PNG files to the category folder (named `1.png`, `2.png`, ...). See [NAMING_EXAMPLES.md](NAMING_EXAMPLES.md) for the exact convention.

---

## Quick Start

### CDN (jsDelivr)

**Development** (always latest from `main`):
```
https://cdn.jsdelivr.net/gh/coppermare/avatarverse/main/avatars/voxel/1.png
```

**Production** (pinned to release for stable URLs):
```
https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/1.png
```

Create a GitHub release tag (e.g. `v1.0.0`) and use `@1.0.0` in URLs to avoid breaking when you add or change avatars.

---

## Deterministic Selection (Seed → Avatar)

Map a seed to an avatar within a category. Uses Cyrb53 hash for even distribution:

```javascript
/**
 * Cyrb53 - simple string hash with good distribution
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 */
function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function getPlaceholderUrl(seed, category = 'voxel', count = 15, options = {}) {
  const tag = options.pinned ? '@1.0.0' : '';
  const base = `https://cdn.jsdelivr.net/gh/coppermare/avatarverse${tag}/avatars/${category}`;
  const index = (cyrb53(seed) % count) + 1;
  return `${base}/${index}.png`;
}

// Development (latest)
getPlaceholderUrl('user@example.com', 'voxel');  // → .../main/avatars/voxel/42.png

// Production (pinned)
getPlaceholderUrl('user@example.com', 'voxel', 15, { pinned: true });  // → .../1.0.0/avatars/voxel/42.png
```

---

## Usage Examples

### HTML (user avatar – descriptive alt)

```html
<img
  src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/1.png"
  alt="Avatar for Alice"
  width="64"
  height="64"
/>
```

### HTML (decorative – empty alt)

```html
<img
  src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/1.png"
  alt=""
  width="64"
  height="64"
  role="presentation"
/>
```

### React (user avatar)

```jsx
function UserAvatar({ seed, size = 64, userName, category = 'voxel' }) {
  const index = (cyrb53(seed) % 15) + 1;
  const src = `https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/${category}/${index}.png`;

  return (
    <img
      src={src}
      alt={userName ? `Avatar for ${userName}` : ''}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
```

### CSS Background

```css
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: url('https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/1.png') center/cover;
}
```

---

## CDN Details

- **Provider**: [jsDelivr](https://www.jsdelivr.com/)
- **Cache**: Global CDN, long cache headers
- **Pinned URLs**: Use `@1.0.0` (or your release tag) in production so avatars do not change when you update the pack
- **Unpinned**: Use `main` only for development or when you always want the latest

---

## Adding Avatars

1. Add PNG files to `avatars/{category}/` named `1.png`, `2.png`, ... (see [NAMING_EXAMPLES.md](NAMING_EXAMPLES.md))
2. Run `npm run generate-avatars` to update the manifest
3. Commit and push to GitHub
4. Create a release tag for production pinning
5. jsDelivr will serve them within minutes

---

## Manifest

Run `npm run generate-avatars` to regenerate `avatars.json`:

```json
{
  "voxel": { "count": 50, "files": ["1.png", "2.png", ...] }
}
```

Fetch for dynamic count per category:

```javascript
const res = await fetch('https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/avatars.json');
const manifest = await res.json();
const voxelCount = manifest.voxel.count;  // use in avatarUrl(seed, 'voxel', voxelCount)
```
