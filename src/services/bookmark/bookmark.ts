import type { ApiResponse } from "@/types/api";
import type { BookmarkListResponse } from "@/types/bookmark";

interface BookmarkListProps {
  boxId: string;
  parentId?: string | null;
  page?: number;
  limit?: number;
}

export async function bookmarkList({
  boxId,
  parentId = null,
  page = 1,
  limit = 20,
}: BookmarkListProps): Promise<BookmarkListResponse> {
  const params = new URLSearchParams({
    box_id: boxId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (parentId) {
    params.append("parent_id", parentId);
  }

  const response = await fetch(`/conn/bookmark/list?${params}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch bookmarks");
  }

  const apiResponse: ApiResponse = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.message || "Failed to fetch bookmarks");
  }

  return apiResponse.data as BookmarkListResponse;
}
