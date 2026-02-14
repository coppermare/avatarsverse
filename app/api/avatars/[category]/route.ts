import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  if (!category) {
    return NextResponse.json(
      { error: { code: "invalid_category", message: "Category is required." } },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }

  const sanitizedCategory = category.replace(/[^a-z0-9-_]/gi, "");
  if (!sanitizedCategory) {
    return NextResponse.json(
      { error: { code: "invalid_category", message: "Category is invalid." } },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }

  const categoryDir = join(AVATARS_DIR, sanitizedCategory);

  try {
    const files = await readdir(categoryDir);
    const imageFiles = files
      .filter((f) => IMAGE_EXT.some((ext) => f.toLowerCase().endsWith(ext)))
      .filter((f, i, arr) => arr.indexOf(f) === i)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return NextResponse.json(
      { files: imageFiles },
      {
        headers: {
          ...CORS_HEADERS,
          "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: { code: "not_found", message: "Category not found." } },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }
}
