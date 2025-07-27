"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

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
}

export function useAddLink({ formData, isValidUrl, handleAddClose }: UseAddLinkProps) {
  const queryClient = useQueryClient();

  const { boxId } = useBoxId();
  const { folderId: parent_id } = useFolderId();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (data: CreateLinkRequest) => createLink(data),
    onSuccess: () => {
      // 북마크 목록 갱신 (무한 스크롤 데이터)
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", boxId, parent_id],
      });

      // 브레드크럼 갱신 (링크 추가로 인한 구조 변경 가능성)
      queryClient.invalidateQueries({
        queryKey: ["breadcrumb", boxId],
      });
    },
    onSettled: () => {
      handleAddClose(); // 링크 추가 후 닫기
    },
  });

  // Form 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.linkUrl.trim()) return;

    if (!isValidUrl) {
      alert("올바른 URL을 입력해주세요.");
      return;
    }

    await mutateAsync({
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
    isAddSuccess: isSuccess,
    isAddError: isError,
    addError: error,
  };
}