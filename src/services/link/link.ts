import type { ApiResponse } from "@/types/api";
import type { Link, CreateLinkRequest, UpdateLinkRequest } from "@/types/link";

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

  return response.json();
}

// 링크 목록 조회
export async function getLinks(
  boxId: string,
  parentId?: string | null
): Promise<ApiResponse<Link[]>> {
  const params = new URLSearchParams({ box_id: boxId });
  if (parentId !== undefined) {
    params.append("parent_id", parentId || "null");
  }

  const response = await fetch(`/conn/link/list?${params.toString()}`, {
    method: "GET",
  });

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
