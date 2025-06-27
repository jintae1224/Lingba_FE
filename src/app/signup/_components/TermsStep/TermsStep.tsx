import classNames from "classnames/bind";
import { useRef } from "react";

import { SignupData } from "@/hooks/signup/useSignup";
import { useTermsStep } from "@/hooks/signup/useTermsStep";

import Checkbox from "../../../_components/Checkbox/Checkbox";
import Drawer, { DrawerHandle } from "../../../_components/Drawer/Drawer";
import PrivacyContent from "./PrivacyContent/PrivacyContent";
import TermsContent from "./TermsContent/TermsContent";
import TermsItem from "./TermsItem/TermsItem";
import styles from "./TermsStep.module.css";

const cx = classNames.bind(styles);

interface TermsStepProps {
  signupData: SignupData;
  onTermsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrivacyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TermsStep({
  signupData,
  onTermsChange,
  onPrivacyChange,
}: TermsStepProps) {
  const drawerRef = useRef<DrawerHandle>(null);

  const {
    showTerms,
    showPrivacy,
    closeTerms,
    closePrivacy,
    onTermsClick,
    onPrivacyClick,
    onTermsLabel,
    onPrivacyLabel,
    onTermsAgree,
    onPrivacyAgree,
  } = useTermsStep({
    signupData,
    onTermsChange,
    onPrivacyChange,
  });

  return (
    <div className={cx("container")}>
      {/* 서비스 이용약관 */}
      <TermsItem
        checked={signupData.termsAccepted}
        onCheckboxClick={onTermsClick}
        onLabelClick={onTermsLabel}
        title="서비스 이용약관에 동의합니다"
      />

      {/* 개인정보처리방침 */}
      <TermsItem
        checked={signupData.privacyAccepted}
        onCheckboxClick={onPrivacyClick}
        onLabelClick={onPrivacyLabel}
        title="개인정보처리방침에 동의합니다"
      />

      {/* 서비스 이용약관 Drawer */}
      {showTerms && (
        <Drawer ref={drawerRef} onClose={closeTerms}>
          <div className={cx("drawer-content")}>
            <h4 className={cx("drawer-title")}>서비스 이용약관</h4>
            <TermsContent />
            <div className={cx("drawer-footer")}>
              <Checkbox
                checked={signupData.termsAccepted}
                onChange={onTermsAgree}
                label="위 약관에 동의합니다"
              />
            </div>
          </div>
        </Drawer>
      )}

      {/* 개인정보처리방침 Drawer */}
      {showPrivacy && (
        <Drawer ref={drawerRef} onClose={closePrivacy}>
          <div className={cx("drawer-content")}>
            <h4 className={cx("drawer-title")}>개인정보처리방침</h4>
            <PrivacyContent />
            <div className={cx("drawer-footer")}>
              <Checkbox
                checked={signupData.privacyAccepted}
                onChange={onPrivacyAgree}
                label="위 개인정보처리방침에 동의합니다"
              />
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}
