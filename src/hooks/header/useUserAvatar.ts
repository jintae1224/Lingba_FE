import { useRouter } from "next/navigation";

import { useCurrentBox } from "@/hooks/box/useCurrentBox";
import { useUserStore } from "@/stores/userStore";

/**
 * 헤더 사용자 아바타 로직을 관리하는 hook
 * 클릭 시 현재 박스의 마이페이지로 이동
 */
export const useUserAvatar = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { currentBox } = useCurrentBox();

  const handleAvatarClick = () => {
    if (currentBox) {
      router.push(`/mypage/${currentBox.id}`);
    }
  };

  return {
    user,
    handleAvatarClick,
    isVisible: !!user,
  };
};