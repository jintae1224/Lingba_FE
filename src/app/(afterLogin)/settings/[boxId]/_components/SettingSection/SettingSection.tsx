"use client";

import classNames from "classnames/bind";

import styles from "./SettingSection.module.css";

const cx = classNames.bind(styles);

export default function SettingSection() {
  return (
    <>
      <div className={cx("settings-section")}>
        <div className={cx("hero")}>
          <div className={cx("hero-title-wrapper")}>
            <h2 className={cx("hero-title")}>계정 설정</h2>
          </div>
          <p className={cx("hero-description")}>
            프로필, 보안, 알림 등 개인 설정을 관리하세요
          </p>
        </div>
        <div className={cx("settings-grid")}>
          <div className={cx("setting-item")}>
            <div className={cx("setting-info")}>
              <h3 className={cx("setting-title")}>프로필 정보</h3>
              <p className={cx("setting-description")}>
                이름, 이메일 등 기본 정보를 수정할 수 있습니다
              </p>
            </div>
            <button className={cx("setting-button")}>편집</button>
          </div>

          <div className={cx("setting-item")}>
            <div className={cx("setting-info")}>
              <h3 className={cx("setting-title")}>비밀번호 변경</h3>
              <p className={cx("setting-description")}>
                보안을 위해 정기적으로 비밀번호를 변경하세요
              </p>
            </div>
            <button className={cx("setting-button")}>변경</button>
          </div>

          <div className={cx("setting-item")}>
            <div className={cx("setting-info")}>
              <h3 className={cx("setting-title")}>알림 설정</h3>
              <p className={cx("setting-description")}>
                이메일 및 푸시 알림 설정을 관리할 수 있습니다
              </p>
            </div>
            <button className={cx("setting-button")}>설정</button>
          </div>
        </div>
      </div>

      <div className={cx("settings-section")}>
        <div className={cx("hero")}>
          <div className={cx("hero-title-wrapper")}>
            <h2 className={cx("hero-title")}>애플리케이션 설정</h2>
          </div>
          <p className={cx("hero-description")}>
            테마, 언어, 백업 등 앱 사용 환경을 설정하세요
          </p>
        </div>
        <div className={cx("settings-grid")}>
          <div className={cx("setting-item")}>
            <div className={cx("setting-info")}>
              <h3 className={cx("setting-title")}>테마 설정</h3>
              <p className={cx("setting-description")}>
                라이트/다크 모드를 선택할 수 있습니다
              </p>
            </div>
            <select className={cx("setting-select")}>
              <option value="light">라이트 모드</option>
              <option value="dark">다크 모드</option>
              <option value="system">시스템 설정</option>
            </select>
          </div>

          <div className={cx("setting-item")}>
            <div className={cx("setting-info")}>
              <h3 className={cx("setting-title")}>언어 설정</h3>
              <p className={cx("setting-description")}>
                사용할 언어를 선택할 수 있습니다
              </p>
            </div>
            <select className={cx("setting-select")}>
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className={cx("setting-item")}>
            <div className={cx("setting-info")}>
              <h3 className={cx("setting-title")}>데이터 백업</h3>
              <p className={cx("setting-description")}>
                북마크 데이터를 백업하고 복원할 수 있습니다
              </p>
            </div>
            <button className={cx("setting-button")}>백업</button>
          </div>
        </div>
      </div>

      <div className={cx("danger-zone")}>
        <div className={cx("hero")}>
          <div className={cx("hero-title-wrapper")}>
            <h2 className={cx("hero-title", "danger")}>위험 영역</h2>
          </div>
          <p className={cx("hero-description")}>
            계정 삭제 등 신중한 결정이 필요한 설정입니다
          </p>
        </div>
        <div className={cx("setting-item", "danger")}>
          <div className={cx("setting-info")}>
            <h3 className={cx("setting-title")}>계정 삭제</h3>
            <p className={cx("setting-description")}>
              계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다
            </p>
          </div>
          <button className={cx("setting-button", "danger")}>삭제</button>
        </div>
      </div>
    </>
  );
}