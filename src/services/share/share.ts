import { ApiResponse } from "@/types/api";

/**
 * 박스 공유 멤버 조회 API 호출
 */
export const getBoxMembers = async (boxId: string) => {
  const response = await fetch(`/conn/share/${boxId}/members`);
  const result: ApiResponse<
    Array<{
      id: string;
      user_id: string;
      nickname: string;
      color?: string;
    }>
  > = await response.json();

  if (!result.success) {
    throw new Error(result.message || "공유 멤버 조회 중 오류가 발생했습니다.");
  }

  return result.data || [];
};

/**
 * 박스 멤버 방출 API 호출
 */
export const revokeBoxMember = async (
  boxId: string,
  memberId: string
): Promise<ApiResponse> => {
  const response = await fetch(`/conn/share/${boxId}/members/revoke`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memberId }),
  });

  const result: ApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "멤버 방출 중 오류가 발생했습니다.");
  }

  return result;
};

/**
 * 박스 토큰 조회 API 호출
 */
export const getBoxToken = async (boxId: string) => {
  const response = await fetch(`/conn/share/${boxId}/token`);
  const result: ApiResponse<{
    id: string;
    box_id: string;
    join_token: string;
    status: string;
    expires_at: string;
  } | null> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "토큰 조회 중 오류가 발생했습니다.");
  }

  return result.data;
};

/**
 * 박스 토큰 발급 API 호출
 */
export const issueBoxToken = async (boxId: string) => {
  const response = await fetch(`/conn/share/${boxId}/token/issued`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const result: ApiResponse<{
    id: string;
    box_id: string;
    join_token: string;
    status: string;
    expires_at: string;
    created_at: string;
    box: {
      id: string;
      name: string;
      color?: string;
    };
  }> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "토큰 발급 중 오류가 발생했습니다.");
  }

  return result.data;
};

/**
 * 박스 토큰 폐기 API 호출
 */
export const discardBoxToken = async (boxId: string): Promise<ApiResponse> => {
  const response = await fetch(`/conn/share/${boxId}/token/discard`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "토큰 폐기 중 오류가 발생했습니다.");
  }

  return result;
};
