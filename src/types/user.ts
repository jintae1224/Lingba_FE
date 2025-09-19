import { USER_COLORS } from "@/constants/colors";
import { AGE_OPTIONS,GENDER_OPTIONS } from "@/constants/signup";

export type Gender = typeof GENDER_OPTIONS[number]["value"];
export type AgeGroup = typeof AGE_OPTIONS[number]["value"];
export type UserColor = typeof USER_COLORS[number];

export interface SignupData {
  nickname: string;
  gender: Gender;
  ageGroup: AgeGroup;
  color: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

// /me API 응답용 사용자 정보 타입
export interface UserProfile {
  nickname: string;
  gender: Gender;
  age_group: AgeGroup;
  provider: string;
  color: string;
  visited_box?: string | null;
  box_count: number;
  link_count: number;
}
