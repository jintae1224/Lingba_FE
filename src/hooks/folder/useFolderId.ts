"use client";

import { useSearchParams } from "next/navigation";

export function useFolderId() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("f_id");
  return { folderId };
}
