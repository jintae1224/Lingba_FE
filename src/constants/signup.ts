export const SIGNUP_STEPS = {
  terms: {
    step: 1,
    title: "서비스 이용약관",
    description: "서비스 이용을 위해 약관에 동의해주세요",
  },
  nickname: {
    step: 2,
    title: "닉네임 설정",
    description: "서비스에서 사용할 닉네임을 입력해주세요",
  },
  gender: {
    step: 3,
    title: "성별 선택",
    description: "성별을 선택해주세요",
  },
  age: {
    step: 4,
    title: "연령대 선택",
    description: "연령대를 선택해주세요",
  },
} as const;

export const SIGNUP_VALIDATION = {
  nickname: {
    minLength: 2,
    maxLength: 20,
  },
} as const;

export const GENDER_OPTIONS = [
  { value: "male", label: "남성", icon: "👨" },
  { value: "female", label: "여성", icon: "👩" },
  { value: "other", label: "기타", icon: "🧑" },
] as const;

export const AGE_OPTIONS = [
  { value: "10s", label: "10대" },
  { value: "20s", label: "20대" },
  { value: "30s", label: "30대" },
  { value: "40s", label: "40대" },
  { value: "50s", label: "50대" },
  { value: "60plus", label: "60대 이상" },
] as const;
