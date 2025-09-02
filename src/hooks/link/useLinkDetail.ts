"use client";

import { useQuery } from "@tanstack/react-query";

import { getLinkDetail } from "@/services/link/link";
import type { ApiResponse } from "@/types/api";
import type { Link } from "@/types/link";

export function useLinkDetail({
  linkId,
  boxId,
}: {
  linkId: string | null;
  boxId: string | null;
}) {
  return useQuery<ApiResponse<Link>, Error>({
    queryKey: ["linkDetail", linkId, boxId],
    queryFn: () => {
      if (!linkId || !boxId) {
        throw new Error("Link ID and Box ID are required");
      }
      return getLinkDetail({ linkId, boxId });
    },
    enabled: !!linkId && !!boxId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
