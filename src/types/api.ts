// 공통 API 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

// 에러 응답 타입
export interface ApiErrorResponse {
  success: false;
  message: string;
  data: null;
}

// 성공 응답 타입
export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}
