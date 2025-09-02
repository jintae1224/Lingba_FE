import type { ApiResponse } from "@/types/api";
import type {
  CreateLinkRequest,
  Link,
  TogglePinRequest,
  TogglePinResponse,
  UpdateLinkRequest,
} from "@/types/link";

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

// 링크 단건 조회
export async function getLinkDetail({
  linkId,
  boxId,
}: {
  linkId: string;
  boxId: string;
}): Promise<ApiResponse<Link>> {
  const response = await fetch(`/conn/link/${linkId}/detail?boxId=${boxId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: 링크 조회 요청 실패`);
  }

  return response.json();
}

export async function toggleLinkPin({
  linkId,
  boxId,
}: Pick<TogglePinRequest, "linkId" | "boxId">): Promise<ApiResponse<TogglePinResponse>> {
  const response = await fetch(`/conn/link/${linkId}/pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ box_id: boxId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: 핀 토글 요청 실패`);
  }

  return response.json();
}
