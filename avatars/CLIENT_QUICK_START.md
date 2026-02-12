# Avatarverse Avatars - Client Quick Start

Share this with your client for immediate use.

---

## URL Format

Avatars are organized by category. Current categories: **voxel**.

**Development** (latest, may change when repo updates):
```
https://cdn.jsdelivr.net/gh/coppermare/avatarverse/main/avatars/voxel/{n}.png
```

**Production** (stable, pin to a release tag):
```
https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/{n}.png
```

Replace `{n}` with avatar number 1, 2, 3, ... Replace `1.0.0` with your actual release tag.

---

## Copy-Paste Examples

### HTML (single avatar, user context)
```html
<img src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/1.png" alt="Avatar for John" width="64" height="64" />
```

### HTML (decorative / list)
```html
<img src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/1.png" alt="" width="48" height="48" role="presentation" />
<img src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/2.png" alt="" width="48" height="48" role="presentation" />
<img src="https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/voxel/3.png" alt="" width="48" height="48" role="presentation" />
```

### JavaScript (seed → same avatar every time)

Uses Cyrb53 hash for even distribution. Pass category (default `voxel`).

```javascript
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

function avatarUrl(seed, category = 'voxel', total = 15, tag = '1.0.0') {
  const n = (cyrb53(seed) % total) + 1;
  return `https://cdn.jsdelivr.net/gh/coppermare/avatarverse@${tag}/avatars/${category}/${n}.png`;
}

// Usage:
// avatarUrl('user@example.com')           → .../voxel/42.png
// avatarUrl('alice', 'voxel')             → .../voxel/7.png
// avatarUrl('bob', 'voxel', 50, '1.0.0') → production URL
```

### React component
```jsx
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

function Avatar({ seed, size = 64, userName, category = 'voxel' }) {
  const n = (cyrb53(seed) % 15) + 1;
  const src = `https://cdn.jsdelivr.net/gh/coppermare/avatarverse@1.0.0/avatars/${category}/${n}.png`;

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

---

## Notes for Client

- **No npm install** – use the CDN URLs directly in `<img src="...">`
- **License**: MIT – free for commercial and personal use
- **Production**: Use `@1.0.0` (or your release tag) in URLs so avatars stay stable
- **Category**: Use `voxel` for voxel-style avatars. More categories may be added later.
- **Voxel count**: 15. Use `avatarUrl(seed, 'voxel', 15)`. Check `avatars.json` for other categories.
- **Accessibility**: Use `alt="Avatar for {name}"` when the image represents a user; use `alt=""` and `role="presentation"` for decorative only
