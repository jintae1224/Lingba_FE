"use client";

import classNames from "classnames/bind";
import Image from "next/image";

import Button from "@/app/_components/Button/Button";
import { useLogin } from "@/hooks/login/useLogin";

import styles from "./Login.module.css";

const cx = classNames.bind(styles);

export default function Login() {
  const { isLoading, error, handleGoogleLogin, handleKakaoLogin, clearError } =
    useLogin();

  return (
    <div className={cx("login-page")}>
      <div className={cx("login-container")}>
        {/* Header - 상단 고정 */}
        <div className={cx("login-header")}>
          <Image
            src="/images/main_logo.png"
            width={110}
            height={60}
            alt="main-logo"
          />
        </div>

        {/* Content - 로그인 버튼 영역 */}
        <div className={cx("login-content")}>
          <div className={cx("login-title")}>
            <h1 className={cx("brand-text")}>AI가 관리해주는 똑똑한 북마크</h1>
            <p>소셜 계정으로 쉽고 빠르게 시작하세요</p>
          </div>

          {error && (
            <div className={cx("error-message")}>
              <p>{error}</p>
              <button onClick={clearError} className={cx("error-close")}>
                ✕
              </button>
            </div>
          )}

          <div className={cx("login-buttons")}>
            <Button
              variant="secondary"
              size="large"
              fullWidth
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={cx("social-button", "google-button")}
            >
              <Image
                src="/images/google-icon.svg"
                width={20}
                height={20}
                alt="Google"
                className={cx("social-icon")}
              />
              {isLoading ? "로그인 중..." : "Google로 시작하기"}
            </Button>

            <Button
              variant="secondary"
              size="large"
              fullWidth
              onClick={handleKakaoLogin}
              disabled={isLoading}
              className={cx("social-button", "kakao-button")}
            >
              <Image
                src="/images/kakao-icon.svg"
                width={20}
                height={20}
                alt="Kakao"
                className={cx("social-icon")}
              />
              {isLoading ? "로그인 중..." : "카카오로 시작하기"}
            </Button>
          </div>

          {/* Terms Notice */}
          <div className={cx("terms-notice")}>
            <p>
              계정 생성을 완료하면
              <span className={cx("terms-link")}>서비스이용약관</span>,
              <span className={cx("terms-link")}>개인정보처리방침</span>에
              동의하게 됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
