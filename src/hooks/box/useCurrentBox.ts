import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useBoxes } from "@/hooks/box/useBox";
import { Box } from "@/types/box";

export function useCurrentBox() {
  const [currentBox, setCurrentBox] = useState<Box | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: boxes, isLoading: boxesLoading } = useBoxes();
  const router = useRouter();
  const pathname = usePathname();

  // 현재 박스 감지 및 redirect 로직
  useEffect(() => {
    if (boxesLoading || !boxes) return;

    // 에러 상태 초기화
    setError(null);

    // /main/[boxId] 경로에서 boxId 추출
    const boxIdMatch = pathname.match(/^\/main\/(.+)$/);

    if (boxIdMatch) {
      // 특정 박스 페이지인 경우
      const boxId = boxIdMatch[1];
      const foundBox = boxes.find((box) => box.id === boxId);

      if (foundBox) {
        setCurrentBox(foundBox);
      } else {
        // 박스를 찾을 수 없는 경우 에러 처리
        setCurrentBox(null);
        setError("존재하지 않는 박스입니다.");
      }
    } else if (pathname === "/main") {
      // /main 페이지인 경우 첫 번째 박스로 redirect
      if (boxes.length > 0) {
        const defaultBox = boxes.find((box) => box.is_default) || boxes[0];
        router.replace(`/main/${defaultBox.id}`);
      }
      setCurrentBox(null);
    } else {
      setCurrentBox(null);
    }
  }, [pathname, boxes, boxesLoading, router]);

  const otherBoxes = boxes?.filter((box) => box.id !== currentBox?.id) || [];

  const handleBoxSelect = (boxId: string) => {
    router.push(`/main/${boxId}`);
  };

  return {
    currentBox,
    otherBoxes,
    boxesLoading,
    error,
    handleBoxSelect,
  };
}
