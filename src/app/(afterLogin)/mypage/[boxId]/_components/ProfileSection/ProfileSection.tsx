"use client";

import classNames from "classnames/bind";

import Avatar from "@/app/_components/Avatar/Avatar";
import BoxIcon from "@/app/_components/Icons/BoxIcon";
import EditIcon from "@/app/_components/Icons/EditIcon";
import LinkIcon from "@/app/_components/Icons/LinkIcon";
import PowerIcon from "@/app/_components/Icons/PowerIcon";
import { useSheetQuery } from "@/hooks/etc/useSheetQuery";
import { useUserLogout } from "@/hooks/user/useUserLogout";
import { UserProfile } from "@/types/user";

import ColorEditSheet from "./ColorEditSheet/ColorEditSheet";
import NicknameEditSheet from "./NicknameEditSheet/NicknameEditSheet";
import styles from "./ProfileSection.module.css";

const cx = classNames.bind(styles);

interface ProfileSectionProps {
  user: UserProfile;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const { handleLogout, isLoggingOut } = useUserLogout();
  // 색상 변경 Sheet 관리
  const {
    isOpen: isColorSheetOpen,
    sheetRef: colorSheetRef,
    openSheet: openColorSheet,
    closeSheet: closeColorSheet,
  } = useSheetQuery({ sheetType: 'user-color' });

  // 닉네임 변경 Sheet 관리
  const {
    isOpen: isNicknameSheetOpen,
    sheetRef: nicknameSheetRef,
    openSheet: openNicknameSheet,
    closeSheet: closeNicknameSheet,
  } = useSheetQuery({ sheetType: 'user-nickname' });


  return (
    <>
      <div className={cx("section")}>
        <div className={cx("header")}>
          <div className={cx("header-content")}>
            <button
              className={cx("logout-btn")}
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label="로그아웃"
            >
              <PowerIcon />
            </button>
          </div>
        </div>

        <div className={cx("content")}>
          <div className={cx("profile-main")}>
            <div className={cx("avatar-container")} onClick={openColorSheet}>
              <Avatar
                nickname={user.nickname}
                color={user.color}
                size="lg"
              />
            </div>

            <div className={cx("name-area")}>
              <h1 className={cx("name")}>{user.nickname}</h1>
              <button
                className={cx("edit-btn")}
                onClick={openNicknameSheet}
                aria-label="프로필 편집"
              >
                <EditIcon width="14" height="14" />
                <span>편집</span>
              </button>
            </div>
          </div>

          <div className={cx("stats")}>
            <div className={cx("stat")}>
              <div className={cx("stat-content")}>
                <BoxIcon className={cx("stat-icon")} />
                <div className={cx("stat-info")}>
                  <span className={cx("stat-label")}>박스</span>
                  <span className={cx("stat-value")}>{user.box_count}</span>
                </div>
              </div>
            </div>

            <div className={cx("stat-divider")} />

            <div className={cx("stat")}>
              <div className={cx("stat-content")}>
                <LinkIcon className={cx("stat-icon")} />
                <div className={cx("stat-info")}>
                  <span className={cx("stat-label")}>링크</span>
                  <span className={cx("stat-value")}>{user.link_count}</span>
                </div>
              </div>
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
