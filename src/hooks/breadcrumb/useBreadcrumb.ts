import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { getBreadcrumb } from "@/services/breadcrumb/breadcrumb";
import type { BreadcrumbItem } from "@/types/breadcrumb";

export function useBreadcrumb() {
  const params = useParams();
  const searchParams = useSearchParams();

  const boxId = params.boxId as string;
  const folderId = searchParams.get("f_id") || null;
  const {
    data: breadcrumbs = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["breadcrumb", boxId, folderId],
    queryFn: async () => {
      const result = await getBreadcrumb(boxId, folderId);
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch breadcrumb");
      }
      return result.data || [];
    },
    enabled: !!boxId,
  });

  return {
    breadcrumbs,
    isLoading,
    error,
    refetch,
  };
}