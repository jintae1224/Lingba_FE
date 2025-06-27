import { USER_COLORS } from "@/constants/colors";

/**
 * 랜덤 사용자 색상을 반환합니다.
 */
export const getRandomUserColor = (): string => {
  const randomIndex = Math.floor(Math.random() * USER_COLORS.length);
  return USER_COLORS[randomIndex];
};
