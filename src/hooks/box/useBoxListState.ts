import { useState } from "react";

import { useCreateBox } from "./useBox";

/**
 * BoxList의 상태와 플로우를 관리하는 hook
 */
export function useBoxListState() {
  const [isCreating, setIsCreating] = useState(false);
  const createBoxMutation = useCreateBox();

  const startCreating = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsCreating(true);
  };

  const finishCreating = () => {
    setIsCreating(false);
  };

  const cancelCreating = () => {
    setIsCreating(false);
  };

  return {
    // 상태
    isCreating,
    isLoading: createBoxMutation.isPending,

    // 액션들
    startCreating,
    finishCreating,
    cancelCreating,
  };
}
