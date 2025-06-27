import classNames from "classnames/bind";

import { GENDER_OPTIONS } from "@/constants/signup";
import { Gender, SignupData } from "@/hooks/signup/useSignup";

import OptionButton from "../../../_components/OptionButton/OptionButton";
import styles from "./GenderStep.module.css";

const cx = classNames.bind(styles);

interface GenderStepProps {
  signupData: SignupData;
  onSelect: (gender: Gender) => void;
}

export default function GenderStep({ signupData, onSelect }: GenderStepProps) {
  return (
    <div className={cx("container")}>
      <div className={cx("grid")}>
        {GENDER_OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            selected={signupData.gender === option.value}
            onClick={() => onSelect(option.value)}
            icon={option.icon}
          >
            {option.label}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
