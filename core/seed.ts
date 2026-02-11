import seedrandom from "seedrandom";

/**
 * Create a deterministic random source from a seed string.
 * Same seed always produces the same sequence of numbers.
 */
export function createRandom(seed: string) {
  const rng = seedrandom(seed);

  return {
    next(): number {
      return rng();
    },
    pick<T>(arr: T[]): T {
      if (arr.length === 0) throw new Error("Cannot pick from empty array");
      const idx = Math.floor(rng() * arr.length);
      return arr[idx];
    },
  };
}
