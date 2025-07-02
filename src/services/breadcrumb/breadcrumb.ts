import type { ApiResponse } from "@/types/api";
import type { BreadcrumbItem } from "@/types/breadcrumb";

// 브레드크럼 조회
export async function getBreadcrumb(
  boxId: string,
  folderId?: string | null
): Promise<ApiResponse<BreadcrumbItem[]>> {
  const params = new URLSearchParams({
    box_id: boxId,
  });

  if (folderId) {
    params.append("folder_id", folderId);
  }

  const response = await fetch(`/conn/folder/breadcrumb?${params.toString()}`, {
    method: "GET",
  });

  return response.json();
}