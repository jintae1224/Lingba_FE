export type Gender = "male" | "female" | "other";
export type AgeGroup = "10s" | "20s" | "30s" | "40s" | "50s" | "60plus";

export interface User {
  id: string;
  email: string;
  name?: string;
  nickname: string;
  gender: Gender;
  age_group: AgeGroup;
  color: string;
  provider: string;
  provider_id: string;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  created_at: string;
  updated_at: string;
}

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
}
