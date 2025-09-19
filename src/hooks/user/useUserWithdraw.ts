import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/user/useUser";
import { withdrawAccount } from "@/services/user/user";

export const useUserWithdraw = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading, error } = useUser();

  // 회원 탈퇴 mutation
  const {
    mutate: withdrawMutate,
    mutateAsync: withdrawAsync,
    isPending: isWithdrawing,
    error: withdrawError,
  } = useMutation({
    mutationFn: withdrawAccount,
    onSuccess: () => {
      // 모든 캐시 제거
      queryClient.clear();
    },
  });

  const handleWithdraw = async () => {
    if (isWithdrawing) return false;

    const confirmed = window.confirm(
      "정말로 회원탈퇴를 하시겠습니까?\n이 작업은 되돌릴 수 없으며 모든 데이터가 삭제됩니다."
    );
    if (!confirmed) return false;

    const doubleConfirmed = window.confirm(
      "다시 한번 확인합니다.\n정말로 탈퇴하시겠습니까?"
    );
    if (!doubleConfirmed) return false;

    try {
      await withdrawAsync();
      alert("회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.");
      router.push("/");
      return true;
    } catch (error) {
      console.error("회원탈퇴 에러:", error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  return {
    // 인증 상태
    user,
    isLoading,
    error,
    isAuthenticated: !!user,

    // 회원 탈퇴
    withdraw: withdrawMutate,
    withdrawAsync,
    isWithdrawing,
    withdrawError,
    handleWithdraw,

    // 유틸리티
    clearUserData: () => queryClient.removeQueries({ queryKey: ["user"] }),
  };
};
