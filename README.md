# Avatarverse

Deterministic profile avatar library. Same seed, same avatar. Every time.

Create unique, consistent avatars for user profiles, chat apps, forums, and team tools. Use any string as a seed (username, email, ID) and Avatarverse generates the same avatar across all platforms.

Inspired by [DiceBear](https://www.dicebear.com/) with a focus on voxel-style avatars and a simple, developer-friendly API.

## Installation

```bash
npm install avatarverse
```

## Usage

### JavaScript / TypeScript

```javascript
import { createAvatar } from "avatarverse";

// Same seed always produces the same avatar
const svg = createAvatar("voxel", "user@example.com", { size: 128 });
// Use the SVG string: inline in React, write to file, etc.
```

### React

```jsx
import { createAvatar } from "avatarverse";

function UserAvatar({ seed, size = 64 }) {
  const svg = createAvatar("voxel", seed, { size });
  return (
    <img
      src={`data:image/svg+xml,${encodeURIComponent(svg)}`}
      alt={`Avatar for ${seed}`}
      width={size}
      height={size}
    />
  );
}
```

### URL-based (with hosted API or Next.js route)

If you run the Avatarverse app (or host the API), use avatars via URL:

```html
<img
  src="https://your-domain.com/api/avatar/voxel?seed=alice&size=64"
  alt="Avatar"
  width="64"
  height="64"
/>
```

## API

### `createAvatar(style, seed, options?)`

Generate a deterministic avatar SVG string.

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `style` | `string` | Yes | Avatar style name. Current: `"voxel"` |
| `seed` | `string` | Yes | Any string (username, email, ID). Same seed = same avatar |
| `options` | `object` | No | Render options |

**Options:**

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `size` | `number` | `64` | Output size in pixels (16-512) |
| `radius` | `number` | `0` | Corner radius 0-50 for rounded avatars |

### `render(style, seed, options?)`

Low-level API. Same as `createAvatar`.

### `getStyle(name)`

Get a registered style by name. Returns `{ render }` or `null`.

## Styles

| Style | Description |
| ----- | ----------- |
| `voxel` | Blocky, low-poly aesthetic with varied head shapes, eyes, and color palettes |

## Deterministic Output

Avatarverse uses a seeded random number generator. For any given `seed` and `options`, the output SVG is always identical. This makes it ideal for:

- User identities across sessions
- Consistent avatars before users upload photos
- Caching (same URL = same image)

## HTTP API (Self-hosted)

The included Next.js app exposes a GET endpoint:

```
GET /api/avatar/:style?seed=...&size=64&radius=0
```

**Query parameters:**

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `seed` | string | `"default"` | Seed for deterministic generation |
| `size` | number | `64` | 16-512 |
| `radius` | number | `0` | 0-50 |

Returns `image/svg+xml` with long-lived cache headers.

## Playground

Run the development server to try avatars interactively:

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the playground.

## Deploy to Vercel

Connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments. The `vercel.json` is preconfigured for Next.js.

## Adding Styles

Avatarverse is designed for multiple styles. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add new avatar styles.

## License

MIT. See [LICENSE](LICENSE).
