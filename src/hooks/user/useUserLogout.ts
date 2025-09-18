import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "@/services/user/user";
import { useUserStore } from "@/stores/userStore";

export const useUserLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading, error, clearUser } = useUserStore();

  // 로그아웃 mutation
  const {
    mutate: logoutMutate,
    mutateAsync: logoutAsync,
    isPending: isLoggingOut,
    error: logoutError,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 모든 캐시 제거
      queryClient.clear();
      // Zustand 스토어 클리어
      clearUser();
    },
  });

  const handleLogout = async () => {
    if (isLoggingOut) return false;

    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (!confirmed) return false;

    try {
      await logoutAsync();
      router.push("/");
      return true;
    } catch (error) {
      console.error("로그아웃 에러:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  return {
    // 인증 상태
    user,
    isLoading,
    error,
    isAuthenticated: !!user,

    // 로그아웃
    logout: logoutMutate,
    logoutAsync,
    isLoggingOut,
    logoutError,
    handleLogout,

    // 유틸리티
    clearUserData: clearUser,
  };
};