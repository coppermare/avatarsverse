import { readFile } from "fs/promises";
import { join } from "path";

import {
  CORS_HEADERS,
  detectImageContentType,
  errorResponse,
  getAvatarFiles,
  optionsResponse,
} from "../../_shared";

const AVATARS_DIR = join(process.cwd(), "avatars");

export const OPTIONS = optionsResponse;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  const { category, id } = await params;
  const files = getAvatarFiles(category);

  if (!files || !/^[a-z0-9.-]+$/i.test(id)) {
    return errorResponse("not_found", "Avatar not found.");
  }

  const hasImageExtension = /\.(png|jpe?g)$/i.test(id);
  const resolvedFilename = hasImageExtension
    ? files.find((filename) => filename === id)
    : files.find((filename) => filename.replace(/\.[^.]+$/, "") === id);

  if (!resolvedFilename) return errorResponse("not_found", "Avatar not found.");

  try {
    const buffer = await readFile(
      join(AVATARS_DIR, category, resolvedFilename)
    );
    const contentType = detectImageContentType(buffer);

    if (!contentType) return errorResponse("not_found", "Avatar not found.");

    const shouldDownload = new URL(request.url).searchParams.has("download");

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(shouldDownload && {
          "Content-Disposition": `attachment; filename="${resolvedFilename}"`,
        }),
      },
    });
  } catch {
    return errorResponse("not_found", "Avatar not found.");
  }
}
