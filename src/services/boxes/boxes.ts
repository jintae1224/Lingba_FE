import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";

/**
 * 박스 목록 조회 API 호출
 */
export const getBoxes = async (): Promise<Box[]> => {
  const response = await fetch("/conn/boxes");
  const result: ApiResponse<Box[]> = await response.json();

  if (!result.success) {
    throw new Error(result.message || "박스 목록 조회 중 오류가 발생했습니다.");
  }

  return result.data || [];
};

/**
 * 특정 박스 조회 API 호출
 */
export const getBox = async (boxId: string): Promise<Box> => {
  const response = await fetch(`/conn/boxes/${boxId}`);
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
  const response = await fetch(`/conn/boxes/${boxId}/visit`, {
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
