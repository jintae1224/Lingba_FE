"use client";

import classNames from "classnames/bind";

import Avatar from "@/app/_components/Avatar/Avatar";
import { USER_COLORS } from "@/constants/colors";
import { useUserColorEdit } from "@/hooks/user/useUserColorEdit";
import { useUserNicknameEdit } from "@/hooks/user/useUserNicknameEdit";
import { UserProfile } from "@/types/user";

import styles from "./ProfileSection.module.css";

const cx = classNames.bind(styles);

interface ProfileSectionProps {
  user: UserProfile;
}


export default function ProfileSection({ user }: ProfileSectionProps) {
  const {
    isEditing: isEditingNickname,
    nickname,
    isProcessing: isProcessingNickname,
    handleEdit: handleEditNickname,
    handleSave: handleSaveNickname,
    handleCancel: handleCancelNickname,
    handleNicknameChange,
  } = useUserNicknameEdit();

  const {
    isEditing: isEditingColor,
    selectedColor,
    isProcessing: isProcessingColor,
    handleEdit: handleEditColor,
    handleSave: handleSaveColor,
    handleCancel: handleCancelColor,
    handleColorSelect,
  } = useUserColorEdit();

  // 전체 편집 상태 (둘 중 하나라도 편집 중이면)
  const isEditing = isEditingNickname || isEditingColor;
  const isProcessing = isProcessingNickname || isProcessingColor;

  // 통합된 핸들러들 (기존 UI 구조 유지를 위해)
  const handleEdit = () => {
    handleEditNickname();
    handleEditColor();
  };

  const handleSave = async () => {
    let success = true;

    if (isEditingNickname) {
      success = await handleSaveNickname() && success;
    }

    if (isEditingColor) {
      success = await handleSaveColor() && success;
    }

    return success;
  };

  const handleCancel = () => {
    if (isEditingNickname) {
      handleCancelNickname();
    }
    if (isEditingColor) {
      handleCancelColor();
    }
  };

  return (
    <section className={cx("section")}>
      <h2 className={cx("section-title")}>프로필</h2>

      <div className={cx("profile-content")}>
        <div className={cx("avatar-area")}>
          <Avatar
            nickname={isEditing ? nickname : user.nickname}
            color={isEditing ? selectedColor : user.color}
            size="lg"
          />

          {isEditing && (
            <div className={cx("color-picker")}>
              <p className={cx("color-label")}>색상 선택</p>
              <div className={cx("color-list")}>
                {USER_COLORS.map((color) => (
                  <button
                    key={color}
                    className={cx("color-option", {
                      selected: selectedColor === color,
                    })}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    aria-label={`색상 ${color} 선택`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={cx("info-area")}>
          {isEditing ? (
            <>
              <div className={cx("form-group")}>
                <label className={cx("label")} htmlFor="nickname">
                  닉네임
                </label>
                <input
                  id="nickname"
                  type="text"
                  className={cx("input")}
                  value={nickname}
                  onChange={handleNicknameChange}
                  maxLength={20}
                  placeholder="닉네임을 입력해주세요"
                />
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
              <div className={cx("info-item")}>
                <span className={cx("info-label")}>닉네임</span>
                <span className={cx("info-value")}>{user.nickname}</span>
              </div>

              <div className={cx("info-item")}>
                <span className={cx("info-label")}>이메일</span>
                <span className={cx("info-value")}>
                  {user.provider === "google" ? "Google 로그인" : ""}
                </span>
              </div>

              <button
                className={cx("button", "button-primary")}
                onClick={handleEdit}
              >
                프로필 수정
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}