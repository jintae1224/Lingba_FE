import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { SIGNUP_STEPS, SIGNUP_VALIDATION } from "@/constants/signup";
import { signupUser } from "@/services/signup/signup";
import { AgeGroup, Gender, SignupData } from "@/types/user";
import { getRandomUserColor } from "@/utils/colors";

export type SignupStep = "terms" | "nickname" | "gender" | "age";
export type GenderWithEmpty = Gender | "";
export type AgeGroupWithEmpty = AgeGroup | "";

export interface SignupFormData {
  nickname: string;
  gender: GenderWithEmpty;
  ageGroup: AgeGroupWithEmpty;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export const useSignup = () => {
  const [currentStep, setCurrentStep] = useState<SignupStep>("terms");
  const [signupData, setSignupData] = useState<SignupFormData>({
    nickname: "",
    gender: "",
    ageGroup: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => signupUser(data),
    onSuccess: () => {
      window.location.href = "/main";
    },
    onError: (error: Error) => {
      alert(error.message || "회원가입 중 오류가 발생했습니다.");
      console.error("회원가입 실패:", error.message);
      window.location.href = "/signup";
    },
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
    const requestData: SignupData = {
      nickname: signupData.nickname,
      gender:
        signupData.gender === "" ? "other" : (signupData.gender as Gender),
      ageGroup: signupData.ageGroup as AgeGroup,
      color: getRandomUserColor(),
      termsAccepted: signupData.termsAccepted,
      privacyAccepted: signupData.privacyAccepted,
    };

    signupMutation.mutate(requestData);
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

  const updateSignupData = (data: Partial<SignupFormData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSignupData({ nickname: e.target.value });
  };

  const handleGenderSelect = (gender: GenderWithEmpty) => {
    updateSignupData({ gender });
  };

  const handleAgeSelect = (ageGroup: AgeGroupWithEmpty) => {
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
    isLoading: signupMutation.isPending,
    error: signupMutation.error,
  };
};
