"use client";

import classNames from "classnames/bind";

import Avatar from "@/app/_components/Avatar/Avatar";
import BoxIcon from "@/app/_components/Icons/BoxIcon";
import EditIcon from "@/app/_components/Icons/EditIcon";
import LinkIcon from "@/app/_components/Icons/LinkIcon";
import { useSheet } from "@/hooks/etc/useSheet";
import { UserProfile } from "@/types/user";

import ColorEditSheet from "./ColorEditSheet/ColorEditSheet";
import NicknameEditSheet from "./NicknameEditSheet/NicknameEditSheet";
import styles from "./ProfileSection.module.css";

const cx = classNames.bind(styles);

interface ProfileSectionProps {
  user: UserProfile;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  // 색상 변경 Sheet 관리
  const {
    isOpen: isColorSheetOpen,
    sheetRef: colorSheetRef,
    openSheet: openColorSheet,
    closeSheet: closeColorSheet,
  } = useSheet();

  // 닉네임 변경 Sheet 관리
  const {
    isOpen: isNicknameSheetOpen,
    sheetRef: nicknameSheetRef,
    openSheet: openNicknameSheet,
    closeSheet: closeNicknameSheet,
  } = useSheet();

  return (
    <>
      <div className={cx("card")}>
        <div className={cx("main")}>
          <Avatar
            nickname={user.nickname}
            color={user.color}
            size="lg"
            onClick={openColorSheet}
          />

          <div className={cx("info")}>
            <div className={cx("header")}>
              <h3 className={cx("name")}>{user.nickname}</h3>
              <button
                className={cx("edit-btn")}
                onClick={openNicknameSheet}
                aria-label="닉네임 편집"
              >
                <EditIcon width="16" height="16" />
              </button>
            </div>
            <div className={cx("stats")}>
              <span className={cx("stat")}>
                <BoxIcon className={cx("stat-icon")} />
                박스 {user.box_count}개
              </span>
              <span className={cx("stat")}>
                <LinkIcon className={cx("stat-icon")} />
                링크 {user.link_count}개
              </span>
            </div>
          </div>
        </div>
      </div>

      {isColorSheetOpen && (
        <ColorEditSheet
          isOpen={isColorSheetOpen}
          onClose={closeColorSheet}
          sheetRef={colorSheetRef}
        />
      )}

      {isNicknameSheetOpen && (
        <NicknameEditSheet
          isOpen={isNicknameSheetOpen}
          onClose={closeNicknameSheet}
          sheetRef={nicknameSheetRef}
        />
      )}
    </>
  );
}
