import { selectTraits } from "./traits";
import { PALETTES } from "./palettes";

export type VoxelOptions = {
  size?: number;
  radius?: number;
};

export function render(seed: string, options: VoxelOptions = {}): string {
  const size = Math.min(512, Math.max(16, options.size ?? 64));
  const radius = options.radius ?? 0;

  const traits = selectTraits(seed);
  const palette = PALETTES[traits.paletteIndex];
  const [bg, fg, accent] = palette;

  const headPath =
    traits.headForm === "round"
      ? "M 50 15 A 35 35 0 1 1 49.99 15"
      : traits.headForm === "square"
        ? "M 15 15 L 85 15 L 85 85 L 15 85 Z"
        : "M 20 20 L 80 20 L 80 80 L 20 80 Z";

  const eyes =
    traits.eyeStyle === "dots"
      ? `<circle cx="35" cy="45" r="5" fill="${fg}"/><circle cx="65" cy="45" r="5" fill="${fg}"/>`
      : traits.eyeStyle === "curve"
        ? `<path d="M 25 45 Q 35 38 45 45" fill="none" stroke="${fg}" stroke-width="3"/><path d="M 55 45 Q 65 38 75 45" fill="none" stroke="${fg}" stroke-width="3"/>`
        : `<ellipse cx="35" cy="45" rx="6" ry="4" fill="${fg}"/><ellipse cx="65" cy="45" rx="6" ry="4" fill="${fg}"/>`;

  const mouth =
    traits.mouthStyle === "line"
      ? `<line x1="35" y1="65" x2="65" y2="65" stroke="${fg}" stroke-width="2"/>`
      : traits.mouthStyle === "smile"
        ? `<path d="M 35 60 Q 50 75 65 60" fill="none" stroke="${fg}" stroke-width="2"/>`
        : `<rect x="40" y="62" width="20" height="4" rx="1" fill="${fg}"/>`;

  const clipId = `clip-${seed.replace(/\W/g, "")}`;
  const clipPath =
    radius > 0
      ? `<defs><clipPath id="${clipId}"><rect width="100" height="100" rx="${radius}" ry="${radius}"/></clipPath></defs>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}"${radius > 0 ? ` clip-path="url(#${clipId})"` : ""}>
${clipPath}
<rect width="100" height="100" fill="${bg}"/>
<g fill="${accent}"><path d="${headPath}"/></g>
<g fill="${fg}" stroke="${fg}">${eyes}${mouth}</g>
</svg>`;
}
