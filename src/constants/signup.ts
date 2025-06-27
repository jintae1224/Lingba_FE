export const SIGNUP_STEPS = {
  terms: {
    step: 1,
    title: "링바에 오신 걸 환영해요",
    description: "시작하려면 약관에 동의해주세요",
  },
  nickname: {
    step: 2,
    title: "사용하실 닉네임을",
    description: "정해주세요",
  },
  gender: {
    step: 3,
    title: "성별을 알려주세요",
    description: "간단히 선택해주시면 돼요",
  },
  age: {
    step: 4,
    title: "연령대를 선택해주세요",
    description: "대략적인 나이만 알아도 충분해요",
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
