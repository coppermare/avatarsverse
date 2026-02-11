export type AvatarParams = {
  seed: string;
  size: number;
  bg?: string;
  palette?: string;
  radius: number;
};

const SIZE_MIN = 16;
const SIZE_MAX = 512;
const SIZE_DEFAULT = 64;

export function parseParams(searchParams: URLSearchParams): AvatarParams {
  const seed = searchParams.get("seed")?.trim() || "default";
  const sizeRaw = searchParams.get("size");
  const radiusRaw = searchParams.get("radius");

  let size = SIZE_DEFAULT;
  if (sizeRaw) {
    const n = parseInt(sizeRaw, 10);
    if (!isNaN(n) && n >= SIZE_MIN && n <= SIZE_MAX) {
      size = n;
    }
  }

  let radius = 0;
  if (radiusRaw) {
    const n = parseInt(radiusRaw, 10);
    if (!isNaN(n) && n >= 0 && n <= 50) {
      radius = n;
    }
  }

  return {
    seed: seed.slice(0, 200),
    size,
    bg: searchParams.get("bg") || undefined,
    palette: searchParams.get("palette") || undefined,
    radius,
  };
}
