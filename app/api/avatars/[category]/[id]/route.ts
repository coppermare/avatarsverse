import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const AVATARS_DIR = join(process.cwd(), "avatars");

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  const { category, id } = await params;

  if (!category || !id) {
    return new Response("Not found", { status: 404 });
  }

  const sanitizedCategory = category.replace(/[^a-z0-9-_]/gi, "");
  const sanitizedId = id.replace(/[^a-z0-9.-]/gi, "");
  if (!sanitizedCategory || !sanitizedId) {
    return new Response("Not found", { status: 404 });
  }

  const filename = sanitizedId.endsWith(".png") ? sanitizedId : `${sanitizedId}.png`;
  const filePath = join(AVATARS_DIR, sanitizedCategory, filename);

  try {
    const buffer = await readFile(filePath);
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
