"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

import { SheetHandle } from "@/app/_components/Sheet/Sheet";

interface UseSheetQueryOptions {
  sheetType: string;
  /** history에 추가할지 여부. false면 replace 사용. 기본값: false */
  addToHistory?: boolean;
}

export function useSheetQuery({ sheetType, addToHistory = false }: UseSheetQueryOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sheetRef = useRef<SheetHandle>(null);

  const editParam = searchParams.get('edit');
  const isOpen = editParam === sheetType;

  const openSheet = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('edit', sheetType);
    const newUrl = `${pathname}?${params.toString()}`;

    if (addToHistory) {
      router.push(newUrl, { scroll: false });
    } else {
      router.replace(newUrl, { scroll: false });
    }
  }, [router, pathname, searchParams, sheetType, addToHistory]);

  const closeSheet = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('edit');
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // 항상 replace 사용해서 뒤로가기 문제 방지
    router.replace(newUrl, { scroll: false });
  }, [router, pathname, searchParams]);

  return { isOpen, sheetRef, openSheet, closeSheet };
}