import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";

/**
 * 사용자 박스 목록 조회 API 호출
 */
export const getBoxes = async (): Promise<Box[]> => {
  const response = await fetch("/conn/box/list");
  const result: ApiResponse<Box[]> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "박스 목록 조회 중 오류가 발생했습니다.");
  }

  return result.data || [];
};

/**
 * 특정 사용자 박스 조회 API 호출
 */
export const getBox = async (boxId: string): Promise<Box> => {
  const response = await fetch(`/conn/box/${boxId}/detail`);
  const result: ApiResponse<Box> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "박스 조회 중 오류가 발생했습니다.");
  }

  if (!result.data) {
    throw new Error("박스 데이터를 찾을 수 없습니다.");
  }

  return result.data;
};

/**
 * 박스 방문 업데이트 API 호출
 */
export const visitBox = async (boxId: string): Promise<ApiResponse> => {
  const response = await fetch(`/conn/box/${boxId}/visit`, {
    method: "PATCH",
  });
  const result: ApiResponse = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "박스 방문 업데이트 중 오류가 발생했습니다."
    );
  }

  return result;
};

/**
 * 새 사용자 박스 생성 API 호출
 */
export const createBox = async (data: {
  name: string;
  color?: string;
}): Promise<Box> => {
  const response = await fetch("/conn/box/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Box> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "박스 생성 중 오류가 발생했습니다.");
  }

  if (!result.data) {
    throw new Error("박스 생성에 실패했습니다.");
  }

  return result.data;
};

/**
 * 사용자 박스 수정 API 호출
 */
export const updateBox = async (
  boxId: string,
  data: { name?: string; color?: string }
): Promise<Box> => {
  const response = await fetch(`/conn/box/${boxId}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Box> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "박스 수정 중 오류가 발생했습니다.");
  }

  if (!result.data) {
    throw new Error("박스 수정에 실패했습니다.");
  }

  return result.data;
};

/**
 * 사용자 박스 삭제 API 호출
 */
export const deleteBox = async (boxId: string): Promise<ApiResponse> => {
  const response = await fetch(`/conn/box/${boxId}/delete`, {
    method: "DELETE",
  });

  const result: ApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "박스 삭제 중 오류가 발생했습니다.");
  }

  return result;
};
