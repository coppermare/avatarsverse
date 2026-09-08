import { AVATAR_MANIFEST } from "@/avatar-manifest";

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export function optionsResponse() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export function errorResponse(code: string, message: string) {
  return Response.json(
    { error: { code, message } },
    { status: 404, headers: CORS_HEADERS }
  );
}

export function getAvatarFiles(category: string): string[] | undefined {
  if (!/^[a-z0-9_-]+$/i.test(category)) return undefined;
  return AVATAR_MANIFEST[category]?.files;
}

export function detectImageContentType(buffer: Buffer): string | undefined {
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    return "image/png";
  }

  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "image/jpeg";
  }

  return undefined;
}
