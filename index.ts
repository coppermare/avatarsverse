/**
 * Avatarverse - Deterministic profile avatar library
 * Same seed, same avatar. Every time.
 *
 * @packageDocumentation
 */

import { render as renderAvatar } from "./core/styles/registry";

export { createRandom } from "./core/seed";
export { getStyle, render } from "./core/styles/registry";
export type { AvatarParams } from "./core/utils/params";
export { parseParams } from "./core/utils/params";

// Re-export voxel style for direct use
export {
  createVoxelStyle,
  type VoxelOptions,
  type VoxelTraits,
} from "./core/styles/voxel";

/** Available avatar style names */
export const STYLES = ["voxel"] as const;

export type StyleName = (typeof STYLES)[number];

/**
 * Create a deterministic avatar SVG string.
 * Same seed + options always returns the same output.
 *
 * @param style - Avatar style name (e.g. "voxel")
 * @param seed - Seed string (username, email, ID). Same seed = same avatar
 * @param options - Optional: size (16-512), radius (0-50)
 */
export function createAvatar(
  style: StyleName | string,
  seed: string,
  options?: { size?: number; radius?: number }
): string {
  return renderAvatar(style, seed, options ?? {});
}
