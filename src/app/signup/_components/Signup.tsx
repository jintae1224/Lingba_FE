"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import { useSignup } from "@/hooks/signup/useSignup";

import AgeStep from "./AgeStep/AgeStep";
import GenderStep from "./GenderStep/GenderStep";
import NicknameStep from "./NicknameStep/NicknameStep";
import styles from "./Signup.module.css";
import SignupButton from "./SignupButton/SignupButton";
import TermsStep from "./TermsStep/TermsStep";

const cx = classNames.bind(styles);

export default function Signup() {
  const {
    currentStep,
    signupData,
    handleNext,
    handleBack,
    canProceed,
    stepInfo,
    handleNicknameChange,
    handleGenderSelect,
    handleAgeSelect,
    handleTermsAccept,
    handlePrivacyAccept,
    isLoading,
  } = useSignup();

  return (
    <div className={cx("signup-page")}>
      <div className={cx("signup-container")}>
        {/* Header - 상단 고정 */}
        <div className={cx("signup-header")}>
          <Image
            src="/images/main_logo.png"
            width={100}
            height={55}
            alt="step-header"
          />
        </div>

        {/* Content - 스크롤 영역 */}
        <div className={cx("signup-content")}>
          <div className={cx("step-header")}>
            <h2 className={cx("step-title")}>{stepInfo.title}</h2>
            <p className={cx("step-description")}>{stepInfo.description}</p>
          </div>
          {currentStep === "terms" && (
            <TermsStep
              signupData={signupData}
              onTermsChange={handleTermsAccept}
              onPrivacyChange={handlePrivacyAccept}
            />
          )}
          {currentStep === "nickname" && (
            <NicknameStep
              signupData={signupData}
              onChange={handleNicknameChange}
            />
          )}
          {currentStep === "gender" && (
            <GenderStep signupData={signupData} onSelect={handleGenderSelect} />
          )}
          {currentStep === "age" && (
            <AgeStep signupData={signupData} onSelect={handleAgeSelect} />
          )}
        </div>

        {/* Footer - 하단 고정 */}
        <div className={cx("signup-footer")}>
          <SignupButton
            canProceed={canProceed}
            showBackButton={currentStep !== "terms"}
            isLoading={isLoading}
            onNext={handleNext}
            onBack={handleBack}
            nextButtonText={currentStep === "age" ? "완료" : "다음"}
          />
        </div>
      </div>
    </div>
  );
}
