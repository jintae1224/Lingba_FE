import { ApiResponse } from "@/types/api";
import { SignupData } from "@/types/user";

/**
 * 회원가입 API 호출
 */
export const signupUser = async (data: SignupData): Promise<ApiResponse> => {
  const response = await fetch("/conn/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "회원가입 중 오류가 발생했습니다.");
  }

  return result;
};
