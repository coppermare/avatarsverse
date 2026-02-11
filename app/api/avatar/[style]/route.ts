import { NextRequest } from "next/server";
import { render } from "@/core/styles/registry";
import { parseParams } from "@/core/utils/params";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ style: string }> }
) {
  const { style } = await params;
  const searchParams = request.nextUrl.searchParams;

  const { seed, size, radius } = parseParams(searchParams);

  try {
    const svg = render(style, seed, { size, radius });

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Unknown style")) {
      return new Response("Style not found", { status: 404 });
    }
    throw err;
  }
}
