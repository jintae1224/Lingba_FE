import type { ApiResponse } from "@/types/api";
import type { LinkList } from "@/types/list";

interface SearchProps {
  query: string;
  boxId: string;
  parentId?: string | null;
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  results: LinkList[];
  totalCount: number;
  query: string;
  filters: {
    boxId?: string;
    parentId?: string | null;
  };
  pagination: {
    page: number;
    limit: number;
    hasNextPage: boolean;
  };
}

export async function searchItems({
  query,
  boxId,
  parentId = null,
  page = 1,
  limit = 20,
}: SearchProps): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    box_id: boxId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (parentId) {
    params.append("parent_id", parentId);
  }

  const response = await fetch(`/conn/search?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to search items");
  }

  const apiResponse: ApiResponse<SearchResponse> = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.message || "Failed to search items");
  }

  return apiResponse.data;
}