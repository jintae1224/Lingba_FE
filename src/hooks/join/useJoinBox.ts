import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

import { joinBoxWithToken } from "@/services/join/join";

interface UseJoinBoxProps {
  onSuccess?: () => void;
}

export const useJoinBox = ({
  onSuccess,
}: UseJoinBoxProps = {}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");

  const { mutate: joinBox, isPending } = useMutation({ 
    mutationFn: joinBoxWithToken,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["boxes"] });
      }
    },
  });

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setToken("");
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setToken(e.target.value);
  };

  const handleJoin = () => {
    const trimmedToken = token.trim();
    if (!trimmedToken) return;

    joinBox(trimmedToken, {
      onSuccess: (data) => {
        if (data.success) {
          alert("박스에 성공적으로 참여했습니다!");
          close();
          onSuccess?.();
        } else {
          alert(`오류: ${data.message}`);
        }
      },
      onError: (error) => {
        alert(`네트워크 오류: ${error.message}`);
      },
    });
  };

  const isValid = token.trim().length > 0;

  return {
    isOpen,
    token,
    isPending,
    isValid,
    open,
    close,
    handleChange,
    handleJoin,
  };
};