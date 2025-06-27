import { useState } from "react";

import oAuthSignIn from "@/utils/supabase/login";

export type LoginProvider = "google" | "kakao";

export interface LoginState {
  isLoading: boolean;
  error: string | null;
}

export const useLogin = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    error: null,
  });

  const handleSocialLogin = async (provider: LoginProvider) => {
    try {
      setLoginState({ isLoading: true, error: null });

      await oAuthSignIn({ provider });

      // OAuth 리다이렉트가 발생하므로 로딩 상태는 여기서 끝나지 않음
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);
      setLoginState({
        isLoading: false,
        error: `${provider} 로그인 중 오류가 발생했습니다. 다시 시도해주세요.`,
      });
    }
  };

  const handleGoogleLogin = () => handleSocialLogin("google");
  const handleKakaoLogin = () => handleSocialLogin("kakao");

  const clearError = () => {
    setLoginState((prev) => ({ ...prev, error: null }));
  };

  return {
    ...loginState,
    handleGoogleLogin,
    handleKakaoLogin,
    clearError,
  };
};
