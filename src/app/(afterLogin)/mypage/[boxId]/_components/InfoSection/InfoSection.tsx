"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import EditIcon from "@/app/_components/Icons/EditIcon";
import { AGE_OPTIONS, GENDER_OPTIONS } from "@/constants/signup";
import { useSheet } from "@/hooks/etc/useSheet";
import { UserProfile } from "@/types/user";

import AgeGroupEditSheet from "./AgeGroupEditSheet/AgeGroupEditSheet";
import GenderEditSheet from "./GenderEditSheet/GenderEditSheet";
import styles from "./InfoSection.module.css";

const cx = classNames.bind(styles);

interface InfoSectionProps {
  user: UserProfile;
}

export default function InfoSection({ user }: InfoSectionProps) {
  // 성별 변경 Sheet 관리
  const {
    isOpen: isGenderSheetOpen,
    sheetRef: genderSheetRef,
    openSheet: openGenderSheet,
    closeSheet: closeGenderSheet,
  } = useSheet();

  // 연령대 변경 Sheet 관리
  const {
    isOpen: isAgeGroupSheetOpen,
    sheetRef: ageGroupSheetRef,
    openSheet: openAgeGroupSheet,
    closeSheet: closeAgeGroupSheet,
  } = useSheet();

  return (
    <>
      <section className={cx("section")}>
        <h2 className={cx("section-title")}>개인정보 설정</h2>

        <div className={cx("content")}>
          <div className={cx("item")}>
            <div className={cx("info")}>
              <div className={cx("info-header")}>
                <h3 className={cx("title")}>로그인 방식</h3>
              </div>
            </div>
            <div className={cx("provider-badge", user.provider)}>
              {user.provider === "google" && (
                <Image
                  src="/images/google-icon.svg"
                  width={16}
                  height={16}
                  alt="Google"
                />
              )}
              {user.provider === "kakao" && (
                <Image
                  src="/images/kakao-icon.svg"
                  width={16}
                  height={16}
                  alt="Kakao"
                />
              )}
              <span className={cx("provider-name")}>
                {user.provider === "google" ? "Google" : "Kakao"}
              </span>
            </div>
          </div>

          <div className={cx("item")}>
            <div className={cx("info")}>
              <div className={cx("info-header")}>
                <h3 className={cx("title")}>성별</h3>
                <button
                  className={cx("edit-btn")}
                  onClick={openGenderSheet}
                  aria-label="성별 편집"
                >
                  <EditIcon width="16" height="16" />
                </button>
              </div>
              <p className={cx("description")}>
                {GENDER_OPTIONS.find((opt) => opt.value === user.gender)
                  ?.label || "-"}
              </p>
            </div>
            <button className={cx("button")} onClick={openGenderSheet}>
              변경
            </button>
          </div>

          <div className={cx("item")}>
            <div className={cx("info")}>
              <div className={cx("info-header")}>
                <h3 className={cx("title")}>연령대</h3>
                <button
                  className={cx("edit-btn")}
                  onClick={openAgeGroupSheet}
                  aria-label="연령대 편집"
                >
                  <EditIcon width="16" height="16" />
                </button>
              </div>
              <p className={cx("description")}>
                {AGE_OPTIONS.find((opt) => opt.value === user.age_group)
                  ?.label || "-"}
              </p>
            </div>
            <button className={cx("button")} onClick={openAgeGroupSheet}>
              변경
            </button>
          </div>
        </div>
      </section>

      {isGenderSheetOpen && (
        <GenderEditSheet
          isOpen={isGenderSheetOpen}
          onClose={closeGenderSheet}
          sheetRef={genderSheetRef}
        />
      )}

      {isAgeGroupSheetOpen && (
        <AgeGroupEditSheet
          isOpen={isAgeGroupSheetOpen}
          onClose={closeAgeGroupSheet}
          sheetRef={ageGroupSheetRef}
        />
      )}
    </>
  );
}
