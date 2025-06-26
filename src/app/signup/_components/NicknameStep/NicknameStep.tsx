import classNames from "classnames/bind";
import { Input } from "jtrc";

import { SIGNUP_VALIDATION } from "@/constants/signup";
import { SignupData } from "@/hooks/signup/useSignup";

import styles from "./NicknameStep.module.css";

const cx = classNames.bind(styles);

interface NicknameStepProps {
  signupData: SignupData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NicknameStep({
  signupData,
  onChange,
}: NicknameStepProps) {
  return (
    <div className={cx("container")}>
      <Input
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={signupData.nickname}
        onChange={onChange}
        maxLength={SIGNUP_VALIDATION.nickname.maxLength}
      />
      <div className={cx("helper")}>
        <span className={cx("counter")}>
          {signupData.nickname.length}/{SIGNUP_VALIDATION.nickname.maxLength}자
        </span>
      </div>
    </div>
  );
}
