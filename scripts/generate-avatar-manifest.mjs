#!/usr/bin/env node
/**
 * Generates avatars.json from PNG files in avatars/{category}/
 * Scans subfolders (voxel, etc.) and builds a category-based manifest.
 * Run: npm run generate-avatars
 */
import { readdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const avatarsDir = join(__dirname, "..", "avatars");
const manifestPath = join(avatarsDir, "avatars.json");

const entries = await readdir(avatarsDir, { withFileTypes: true });
const manifest = {};

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  if (entry.name.startsWith(".")) continue;

  const categoryDir = join(avatarsDir, entry.name);
  const files = await readdir(categoryDir);
  const pngFiles = files
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  manifest[entry.name] = {
    count: pngFiles.length,
    files: pngFiles,
  };

  console.log(`${entry.name}: ${pngFiles.length} avatars`);
  if (pngFiles.length > 0) {
    console.log(`  ${pngFiles.slice(0, 5).join(", ")}${pngFiles.length > 5 ? "..." : ""}`);
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
const total = Object.values(manifest).reduce((s, c) => s + c.count, 0);
console.log(`\nUpdated avatars.json: ${total} avatars across ${Object.keys(manifest).length} categories`);
