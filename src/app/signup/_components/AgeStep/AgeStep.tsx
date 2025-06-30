import classNames from "classnames/bind";

import { AGE_OPTIONS } from "@/constants/signup";
import { AgeGroupWithEmpty, SignupFormData } from "@/hooks/signup/useSignup";

import OptionButton from "../../../_components/OptionButton/OptionButton";
import styles from "./AgeStep.module.css";

const cx = classNames.bind(styles);

interface AgeStepProps {
  signupData: SignupFormData;
  onSelect: (ageGroup: AgeGroupWithEmpty) => void;
}

export default function AgeStep({ signupData, onSelect }: AgeStepProps) {
  return (
    <div className={cx("container")}>
      <div className={cx("grid")}>
        {AGE_OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            selected={signupData.ageGroup === option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
