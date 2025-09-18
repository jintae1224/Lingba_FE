import { ApiResponse } from "@/types/api";
import { UserProfile } from "@/types/user";

/**
 * 사용자 프로필 조회 API 호출
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch("/conn/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const result: ApiResponse<UserProfile> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "사용자 프로필 조회 중 오류가 발생했습니다.");
  }

  if (!result.data) {
    throw new Error("사용자 프로필 데이터를 찾을 수 없습니다.");
  }

  return result.data;
};

/**
 * 사용자 프로필 수정 API 호출
 */
export const updateProfile = async (data: {
  nickname?: string;
  color?: string;
}): Promise<UserProfile> => {
  const response = await fetch("/conn/user/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const result: ApiResponse<UserProfile> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "프로필 수정 중 오류가 발생했습니다.");
  }

  if (!result.data) {
    throw new Error("프로필 수정에 실패했습니다.");
  }

  return result.data;
};

/**
 * 사용자 설정 수정 API 호출
 */
export const updateSettings = async (data: {
  gender?: "male" | "female" | "other";
  age_group?: "10s" | "20s" | "30s" | "40s" | "50s" | "60plus";
}): Promise<UserProfile> => {
  const response = await fetch("/conn/user/settings", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update settings");
  }

  const result: ApiResponse<UserProfile> = await response.json();
  if (!result.success) {
    throw new Error(result.message || "설정 수정 중 오류가 발생했습니다.");
  }

  if (!result.data) {
    throw new Error("설정 수정에 실패했습니다.");
  }

  return result.data;
};

/**
 * 로그아웃 API 호출
 */
export const logout = async (): Promise<void> => {
  const response = await fetch("/conn/user/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  const result: ApiResponse = await response.json();
  if (!result.success) {
    throw new Error(result.message || "로그아웃 중 오류가 발생했습니다.");
  }
};

/**
 * 회원 탈퇴 API 호출
 */
export const withdrawAccount = async (): Promise<void> => {
  const response = await fetch("/conn/user/withdraw", {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to withdraw account");
  }

  const result: ApiResponse = await response.json();
  if (!result.success) {
    throw new Error(result.message || "회원탈퇴 중 오류가 발생했습니다.");
  }
};