import type { ApiResponse } from "@/types/api";
import type { CreateLinkRequest, Link, UpdateLinkRequest } from "@/types/link";

// 링크 생성
export async function createLink(
  data: CreateLinkRequest
): Promise<ApiResponse<Link>> {
  const response = await fetch("/conn/link/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: 링크 생성 요청 실패`);
  }

  return response.json();
}

// 링크 수정
export async function updateLink(
  linkId: string,
  data: UpdateLinkRequest
): Promise<ApiResponse<Link>> {
  const response = await fetch(`/conn/link/${linkId}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// 링크 삭제
export async function deleteLink(linkId: string): Promise<ApiResponse<null>> {
  const response = await fetch(`/conn/link/${linkId}/delete`, {
    method: "DELETE",
  });

  return response.json();
}
