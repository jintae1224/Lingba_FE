import { ApiResponse } from "@/types/api";

/**
 * 토큰으로 박스 참여 API 호출
 */
export const joinBoxWithToken = async (join_token: string): Promise<ApiResponse> => {
  const response = await fetch("/conn/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ join_token }),
  });

  return response.json();
};