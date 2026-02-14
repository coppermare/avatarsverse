#!/usr/bin/env node
/**
 * Generates avatars/avatars.json and avatar-manifest.ts from image files in avatars/{category}/.
 * Scans subfolders (voxel, etc.) and builds a category-based manifest.
 * Run: npm run generate-avatars
 */
import { readdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const avatarsDir = join(__dirname, "..", "avatars");
const manifestPath = join(avatarsDir, "avatars.json");
const manifestTsPath = join(__dirname, "..", "avatar-manifest.ts");
const IMAGE_EXT = [".png", ".jpg", ".jpeg"];

const entries = await readdir(avatarsDir, { withFileTypes: true });
const manifest = {};

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  if (entry.name.startsWith(".")) continue;

  const categoryDir = join(avatarsDir, entry.name);
  const files = await readdir(categoryDir);
  const imageFiles = files
    .filter((f) => IMAGE_EXT.some((ext) => f.toLowerCase().endsWith(ext)))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  manifest[entry.name] = {
    count: imageFiles.length,
    files: imageFiles,
  };

  console.log(`${entry.name}: ${imageFiles.length} avatars`);
  if (imageFiles.length > 0) {
    console.log(`  ${imageFiles.slice(0, 5).join(", ")}${imageFiles.length > 5 ? "..." : ""}`);
  }
}

const manifestJson = JSON.stringify(manifest, null, 2);
const manifestTs = `export type AvatarManifest = Record<
  string,
  {
    count: number;
    files: string[];
  }
>;

/**
 * Generated from avatars/avatars.json.
 * Run \`npm run generate-avatars\` after changing avatar assets.
 */
export const AVATAR_MANIFEST: AvatarManifest = ${manifestJson};
`;

await writeFile(manifestPath, manifestJson);
await writeFile(manifestTsPath, manifestTs);

const total = Object.values(manifest).reduce((s, c) => s + c.count, 0);
console.log(`\nUpdated avatars.json + avatar-manifest.ts: ${total} avatars across ${Object.keys(manifest).length} categories`);
