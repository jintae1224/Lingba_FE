"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

import type { SheetHandle } from "@/app/_components/Sheet/Sheet";

export function useLinkDetailQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sheetRef = useRef<SheetHandle>(null);

  const linkId = searchParams.get('linkId');
  const isDetailOpen = !!linkId;

  const closeDetail = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('linkId');
    const queryString = params.toString();
    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false }
    );
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  return {
    linkId,
    isDetailOpen,
    closeDetail,
    sheetRef,
    handleCloseSheet,
  };
}