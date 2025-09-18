"use client";

import classNames from "classnames/bind";

import { AGE_OPTIONS, GENDER_OPTIONS } from "@/constants/signup";
import { useUserSettings } from "@/hooks/user/useUserSettings";
import { UserProfile } from "@/types/user";

import styles from "./InfoSection.module.css";

const cx = classNames.bind(styles);

interface InfoSectionProps {
  user: UserProfile;
}


export default function InfoSection({ user }: InfoSectionProps) {
  const {
    isEditing,
    gender,
    ageGroup,
    isProcessing,
    handleEdit,
    handleSave,
    handleCancel,
    handleGenderChange,
    handleAgeGroupChange,
  } = useUserSettings();

  return (
    <section className={cx("section")}>
      <h2 className={cx("section-title")}>개인정보 설정</h2>

      <div className={cx("settings-content")}>
        {isEditing ? (
          <>
            <div className={cx("form-group")}>
              <label className={cx("label")}>성별</label>
              <div className={cx("radio-group")}>
                {GENDER_OPTIONS.map((option) => (
                  <label key={option.value} className={cx("radio-label")}>
                    <input
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={gender === option.value}
                      onChange={handleGenderChange}
                      className={cx("radio-input")}
                    />
                    <span className={cx("radio-text")}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={cx("form-group")}>
              <label className={cx("label")}>연령대</label>
              <select
                className={cx("select")}
                value={ageGroup}
                onChange={handleAgeGroupChange}
              >
                {AGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={cx("button-group")}>
              <button
                className={cx("button", "button-primary")}
                onClick={handleSave}
                disabled={isProcessing}
              >
                {isProcessing ? "저장 중..." : "저장"}
              </button>
              <button
                className={cx("button", "button-secondary")}
                onClick={handleCancel}
                disabled={isProcessing}
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={cx("info-group")}>
              <div className={cx("info-item")}>
                <span className={cx("info-label")}>성별</span>
                <span className={cx("info-value")}>
                  {GENDER_OPTIONS.find((opt) => opt.value === user.gender)
                    ?.label || "-"}
                </span>
              </div>

              <div className={cx("info-item")}>
                <span className={cx("info-label")}>연령대</span>
                <span className={cx("info-value")}>
                  {AGE_OPTIONS.find((opt) => opt.value === user.age_group)
                    ?.label || "-"}
                </span>
              </div>

              <div className={cx("info-item")}>
                <span className={cx("info-label")}>로그인 방식</span>
                <span className={cx("info-value")}>
                  {user.provider === "google" ? "Google" : user.provider}
                </span>
              </div>
            </div>

            <button
              className={cx("button", "button-primary")}
              onClick={handleEdit}
            >
              설정 변경
            </button>
          </>
        )}
      </div>
    </section>
  );
}