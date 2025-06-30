export type Gender = "male" | "female" | "other";
export type AgeGroup = "10s" | "20s" | "30s" | "40s" | "50s" | "60plus";

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
}
