import classNames from "classnames/bind";

import { GENDER_OPTIONS } from "@/constants/signup";
import { GenderWithEmpty, SignupFormData } from "@/hooks/signup/useSignup";

import Button from "../../../_components/Button/Button";
import styles from "./GenderStep.module.css";

const cx = classNames.bind(styles);

interface GenderStepProps {
  signupData: SignupFormData;
  onSelect: (gender: GenderWithEmpty) => void;
}

export default function GenderStep({ signupData, onSelect }: GenderStepProps) {
  return (
    <div className={cx("container")}>
      <div className={cx("grid")}>
        {GENDER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant="option"
            selected={signupData.gender === option.value}
            onClick={() => onSelect(option.value)}
            fullWidth
          >
            {option.icon}
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
