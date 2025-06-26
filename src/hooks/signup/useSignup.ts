import { useState } from "react";

import { SIGNUP_STEPS, SIGNUP_VALIDATION } from "@/constants/signup";

export type SignupStep = "terms" | "nickname" | "gender" | "age";
export type Gender = "male" | "female" | "other" | "";
export type AgeGroup = "10s" | "20s" | "30s" | "40s" | "50s" | "60plus" | "";

export interface SignupData {
  nickname: string;
  gender: Gender;
  ageGroup: AgeGroup;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export const useSignup = () => {
  const [currentStep, setCurrentStep] = useState<SignupStep>("terms");
  const [signupData, setSignupData] = useState<SignupData>({
    nickname: "",
    gender: "",
    ageGroup: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const handleNext = () => {
    switch (currentStep) {
      case "terms":
        setCurrentStep("nickname");
        break;
      case "nickname":
        setCurrentStep("gender");
        break;
      case "gender":
        setCurrentStep("age");
        break;
      case "age":
        handleComplete();
        break;
    }
  };

  const handleBack = () => {
    const steps: SignupStep[] = ["terms", "nickname", "gender", "age"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = () => {
    // TODO: 회원가입 완료 처리
    console.log("회원가입 완료:", signupData);
    alert("회원가입이 완료되었습니다!");
  };

  const canProceed = (() => {
    switch (currentStep) {
      case "terms":
        return signupData.termsAccepted && signupData.privacyAccepted;
      case "nickname":
        return (
          signupData.nickname.trim().length >=
          SIGNUP_VALIDATION.nickname.minLength
        );
      case "gender":
        return signupData.gender !== "";
      case "age":
        return signupData.ageGroup !== "";
      default:
        return false;
    }
  })();

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSignupData({ nickname: e.target.value });
  };

  const handleGenderSelect = (gender: Gender) => {
    updateSignupData({ gender });
  };

  const handleAgeSelect = (ageGroup: AgeGroup) => {
    updateSignupData({ ageGroup });
  };

  const handleTermsAccept = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSignupData({ termsAccepted: e.target.checked });
  };

  const handlePrivacyAccept = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSignupData({ privacyAccepted: e.target.checked });
  };

  const stepInfo = SIGNUP_STEPS[currentStep];

  return {
    currentStep,
    signupData,
    handleNext,
    handleBack,
    canProceed,
    updateSignupData,
    stepInfo,
    handleNicknameChange,
    handleGenderSelect,
    handleAgeSelect,
    handleTermsAccept,
    handlePrivacyAccept,
  };
};
