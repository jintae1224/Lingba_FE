"use client";

import { useParams } from "next/navigation";

export function useBoxId() {
  const params = useParams();
  const boxId = params?.boxId as string | undefined;
  return { boxId };
}
