import { createRandom } from "../../seed";
import { PALETTES } from "./palettes";

export type VoxelTraits = {
  headForm: "round" | "square" | "block";
  eyeStyle: "dots" | "curve" | "oval";
  mouthStyle: "line" | "smile" | "neutral";
  backgroundMotif: "solid" | "grid" | "dots";
  paletteIndex: number;
};

const HEAD_FORMS: VoxelTraits["headForm"][] = ["round", "square", "block"];
const EYE_STYLES: VoxelTraits["eyeStyle"][] = ["dots", "curve", "oval"];
const MOUTH_STYLES: VoxelTraits["mouthStyle"][] = ["line", "smile", "neutral"];
const BACKGROUND_MOTIFS: VoxelTraits["backgroundMotif"][] = ["solid", "grid", "dots"];

export function selectTraits(seed: string): VoxelTraits {
  const rng = createRandom(seed);

  return {
    headForm: rng.pick(HEAD_FORMS),
    eyeStyle: rng.pick(EYE_STYLES),
    mouthStyle: rng.pick(MOUTH_STYLES),
    backgroundMotif: rng.pick(BACKGROUND_MOTIFS),
    paletteIndex: Math.floor(rng.next() * PALETTES.length),
  };
}
