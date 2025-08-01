"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/providers/ToastProvider";
import { createLink } from "@/services/link/link";
import type { CreateLinkRequest } from "@/types/link";

import { useBoxId } from "../box/useBoxId";
import { useFolderId } from "../folder/useFolderId";

interface FormData {
  linkUrl: string;
  linkName: string;
  linkDesc: string;
  useAi: boolean;
}

interface UseAddLinkProps {
  formData: FormData;
  isValidUrl: boolean;
  handleAddClose: () => void;
  resetForm?: () => void;
}

export function useAddLink({
  formData,
  isValidUrl,
  handleAddClose,
  resetForm,
}: UseAddLinkProps) {
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  const { boxId } = useBoxId();
  const { folderId: parent_id } = useFolderId();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateLinkRequest) => createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", boxId, parent_id],
      });
      success("링크가 성공적으로 추가되었습니다!");

      if (resetForm) {
        resetForm();
      }
      handleAddClose();
    },
    onError: (error) => {
      showError(error.message || "링크 추가에 실패했습니다.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.linkUrl.trim()) return;

    if (!isValidUrl) {
      showError("올바른 URL을 입력해주세요.");
      return;
    }

    mutateAsync({
      url: formData.linkUrl.trim(),
      title: formData.linkName?.trim() || undefined,
      description: formData.linkDesc?.trim() || undefined,
      box_id: boxId || "",
      parent_id: parent_id || undefined,
    });
  };

  return {
    handleSubmit,
    isAddLoading: isPending,
  };
}
