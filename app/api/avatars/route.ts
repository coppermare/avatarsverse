import { AVATAR_MANIFEST } from "@/avatar-manifest";

import { CORS_HEADERS, optionsResponse } from "./_shared";

export const OPTIONS = optionsResponse;

export function GET() {
  const categories = Object.fromEntries(
    Object.entries(AVATAR_MANIFEST)
      .filter(([, category]) => category.files.length > 0)
      .map(([name, category]) => [name, category.files])
  );

  return Response.json(
    { categories },
    {
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    }
  );
}
