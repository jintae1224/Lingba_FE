"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useLinkDetailQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const linkId = searchParams.get('linkId');
  const isDetailOpen = !!linkId;

  const closeDetail = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('linkId');
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return {
    linkId,
    isDetailOpen,
    closeDetail,
  };
}