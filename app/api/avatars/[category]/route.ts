import {
  CORS_HEADERS,
  errorResponse,
  getAvatarFiles,
  optionsResponse,
} from "../_shared";

export const OPTIONS = optionsResponse;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const files = getAvatarFiles(category);

  if (!files) return errorResponse("not_found", "Category not found.");

  return Response.json(
    { files },
    {
      headers: {
        ...CORS_HEADERS,
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    }
  );
}
