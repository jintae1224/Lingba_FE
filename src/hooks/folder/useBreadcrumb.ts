import { useQuery } from "@tanstack/react-query";

export interface BreadcrumbItem {
  id: string;
  name: string;
  parent_id: string | null;
}

async function getBreadcrumb(
  boxId: string,
  folderId?: string | null
): Promise<BreadcrumbItem[]> {
  const params = new URLSearchParams({
    box_id: boxId,
  });

  if (folderId) {
    params.append("folder_id", folderId);
  }

  const response = await fetch(`/conn/folder/breadcrumb?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch breadcrumb");
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to fetch breadcrumb");
  }

  return result.data || [];
}

export function useBreadcrumb(boxId: string, folderId?: string | null) {
  const {
    data: breadcrumbs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["breadcrumb", boxId, folderId],
    queryFn: () => getBreadcrumb(boxId, folderId),
    enabled: !!boxId,
  });

  return {
    breadcrumbs,
    isLoading,
    error,
    refetch,
  };
}
