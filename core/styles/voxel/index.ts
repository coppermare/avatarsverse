import type { VoxelOptions } from "./render";
import { render } from "./render";

export { render, type VoxelOptions } from "./render";
export { selectTraits, type VoxelTraits } from "./traits";

const metadata = {
  name: "voxel",
  version: "1.0.0",
  defaults: { size: 64, radius: 0 },
};

export function createVoxelStyle() {
  return {
    metadata,
    render: (seed: string, options: VoxelOptions = {}) => render(seed, options),
  };
}
