"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

import { SheetHandle } from "@/app/_components/Sheet/Sheet";

export function useSheetQuery({ sheetType }: { sheetType: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sheetRef = useRef<SheetHandle>(null);

  const editParam = searchParams.get('edit');
  const isOpen = editParam === sheetType;

  const openSheet = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('edit', sheetType);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeSheet = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('edit');
    const queryString = params.toString();
    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false }
    );
  };

  return { isOpen, sheetRef, openSheet, closeSheet };
}