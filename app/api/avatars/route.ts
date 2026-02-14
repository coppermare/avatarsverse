import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const AVATARS_DIR = join(process.cwd(), "avatars");
const IMAGE_EXT = [".png", ".jpg", ".jpeg"];
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET() {
  try {
    const entries = await readdir(AVATARS_DIR, { withFileTypes: true });
    const categories: Record<string, string[]> = {};

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".")) continue;

      const categoryDir = join(AVATARS_DIR, entry.name);
      const files = await readdir(categoryDir);
      const imageFiles = files
        .filter((f) => IMAGE_EXT.some((ext) => f.toLowerCase().endsWith(ext)))
        .filter((f, i, arr) => arr.indexOf(f) === i)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      if (imageFiles.length > 0) {
        categories[entry.name] = imageFiles;
      }
    }

    return NextResponse.json(
      { categories },
      {
        headers: {
          ...CORS_HEADERS,
          "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: { code: "not_found", message: "Avatar catalog not found." } },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }
}
