import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const AVATARS_DIR = join(process.cwd(), "avatars");
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"] as const;
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
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  const { category, id } = await params;

  if (!category || !id) {
    return NextResponse.json(
      { error: { code: "not_found", message: "Avatar not found." } },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }

  const sanitizedCategory = category.replace(/[^a-z0-9-_]/gi, "");
  const sanitizedId = id.replace(/[^a-z0-9.-]/gi, "");
  if (!sanitizedCategory || !sanitizedId) {
    return NextResponse.json(
      { error: { code: "not_found", message: "Avatar not found." } },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }

  try {
    const hasImageExt = /\.(png|jpe?g)$/i.test(sanitizedId);
    const candidateFilenames = hasImageExt
      ? [sanitizedId]
      : IMAGE_EXTENSIONS.map((ext) => `${sanitizedId}${ext}`);

    let resolvedFilename: string | null = null;
    let buffer: Buffer | null = null;

    for (const candidate of candidateFilenames) {
      try {
        buffer = await readFile(join(AVATARS_DIR, sanitizedCategory, candidate));
        resolvedFilename = candidate;
        break;
      } catch {
        // Continue trying next extension candidate.
      }
    }

    if (!buffer || !resolvedFilename) {
      return NextResponse.json(
        { error: { code: "not_found", message: "Avatar not found." } },
        {
          status: 404,
          headers: CORS_HEADERS,
        }
      );
    }

    const contentType = resolvedFilename.toLowerCase().endsWith(".png")
      ? "image/png"
      : "image/jpeg";

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json(
      { error: { code: "not_found", message: "Avatar not found." } },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }
}
