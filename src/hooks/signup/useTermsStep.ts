import { useState } from "react";

import { SignupFormData } from "./useSignup";

interface UseTermsStepProps {
  signupData: SignupFormData;
  onTermsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrivacyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useTermsStep = ({
  signupData,
  onTermsChange,
  onPrivacyChange,
}: UseTermsStepProps) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const openTerms = () => setShowTerms(true);
  const closeTerms = () => setShowTerms(false);
  const openPrivacy = () => setShowPrivacy(true);
  const closePrivacy = () => setShowPrivacy(false);

  const onTermsClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!signupData.termsAccepted) {
      e.preventDefault();
      openTerms();
    } else {
      onTermsChange(e);
    }
  };

  const onPrivacyClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!signupData.privacyAccepted) {
      e.preventDefault();
      openPrivacy();
    } else {
      onPrivacyChange(e);
    }
  };

  const onTermsLabel = () => {
    if (!signupData.termsAccepted) {
      openTerms();
    } else {
      const syntheticEvent = {
        target: { checked: false, name: "termsAccepted" },
      } as React.ChangeEvent<HTMLInputElement>;
      onTermsChange(syntheticEvent);
    }
  };

  const onPrivacyLabel = () => {
    if (!signupData.privacyAccepted) {
      openPrivacy();
    } else {
      const syntheticEvent = {
        target: { checked: false, name: "privacyAccepted" },
      } as React.ChangeEvent<HTMLInputElement>;
      onPrivacyChange(syntheticEvent);
    }
  };

  const onTermsAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTermsChange(e);
    closeTerms();
  };

  const onPrivacyAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPrivacyChange(e);
    closePrivacy();
  };

  return {
    // States
    showTerms,
    showPrivacy,

    // Close handlers
    closeTerms,
    closePrivacy,

    // Click handlers
    onTermsClick,
    onPrivacyClick,

    // Label handlers
    onTermsLabel,
    onPrivacyLabel,

    // Agree handlers
    onTermsAgree,
    onPrivacyAgree,
  };
};
