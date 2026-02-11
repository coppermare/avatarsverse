import { createVoxelStyle } from "./voxel";

type StyleRenderer = (seed: string, options: Record<string, unknown>) => string;

const styles: Map<string, { render: StyleRenderer }> = new Map();

const voxel = createVoxelStyle();
styles.set("voxel", { render: voxel.render });

export function getStyle(name: string): { render: StyleRenderer } | null {
  return styles.get(name.toLowerCase()) ?? null;
}

export function render(
  style: string,
  seed: string,
  options: Record<string, unknown> = {}
): string {
  const styleImpl = getStyle(style);
  if (!styleImpl) {
    throw new Error(`Unknown style: ${style}`);
  }
  return styleImpl.render(seed, options);
}
