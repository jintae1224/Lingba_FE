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
      <section className={cx("profile-section")}>
        <h2 className={cx("section-title")}>프로필</h2>

        <div className={cx("content")}>
          <div className={cx("item", "profile-item")}>
            <div className={cx("avatar-container")} onClick={openColorSheet}>
              <Avatar
                nickname={user.nickname}
                color={user.color}
                size="lg"
                onClick={openColorSheet}
              />
            </div>
            <div className={cx("info")}>
              <div className={cx("info-header")}>
                <h3 className={cx("title")}>{user.nickname}</h3>
                <button
                  className={cx("edit-btn")}
                  onClick={openNicknameSheet}
                  aria-label="닉네임 편집"
                >
                  <EditIcon width="16" height="16" />
                </button>
              </div>
              <p className={cx("description")}>
                클릭하여 프로필 색상을 변경하세요
              </p>
            </div>
          </div>
          <div className={cx("item", "stats-item")}>
            <div className={cx("info")}>
              <div className={cx("info-header")}>
                <h3 className={cx("title")}>통계</h3>
              </div>
              <div className={cx("stats-content")}>
                <div className={cx("stat-item")}>
                  <BoxIcon className={cx("stat-icon")} />
                  <span className={cx("stat-text")}>
                    박스 {user.box_count}개
                  </span>
                </div>
                <span className={cx("stat-divider")}>·</span>
                <div className={cx("stat-item")}>
                  <LinkIcon className={cx("stat-icon")} />
                  <span className={cx("stat-text")}>
                    링크 {user.link_count}개
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("item", "logout-item")}>
            <div className={cx("info")}>
              <div className={cx("info-header")}>
                <h3 className={cx("title")}>로그아웃</h3>
              </div>
              <p className={cx("description")}>현재 계정에서 로그아웃합니다</p>
            </div>
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
      </section>

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
