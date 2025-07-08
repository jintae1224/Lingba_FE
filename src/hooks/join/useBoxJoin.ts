import { useMutation, useQueryClient } from "@tanstack/react-query";

import { joinBoxWithToken } from "@/services/join/join";

export const useBoxJoin = () => {
  const queryClient = useQueryClient();

  return useMutation({ 
    mutationFn: joinBoxWithToken,
    onSuccess: (data) => {
      if (data.success) {
        alert("박스에 성공적으로 참여했습니다!");
        queryClient.invalidateQueries({ queryKey: ["boxes"] });
      } else {
        alert(`오류: ${data.message}`);
      }
    },
    onError: (error) => {
      alert(`네트워크 오류: ${error.message}`);
    },
  });
};