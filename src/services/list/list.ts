import type { ApiResponse } from "@/types/api";
import type { ListResponse } from "@/types/list";

interface ListProps {
  boxId: string;
  parentId?: string | null;
  page?: number;
  limit?: number;
}

export async function listItems({
  boxId,
  parentId = null,
  page = 1,
  limit = 20,
}: ListProps): Promise<ListResponse> {
  const params = new URLSearchParams({
    box_id: boxId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (parentId) {
    params.append("parent_id", parentId);
  }

  const response = await fetch(`/conn/list?${params}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch list items");
  }

  const apiResponse: ApiResponse = await response.json();

  if (!apiResponse.success) {
    throw new Error(apiResponse.message || "Failed to fetch list items");
  }

  return apiResponse.data as ListResponse;
}
