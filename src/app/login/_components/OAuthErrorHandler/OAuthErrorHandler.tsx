"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthErrorHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      // 에러 메시지 표시
      let message = "로그인 중 오류가 발생했습니다.";

      if (errorDescription) {
        // URL 디코딩
        const decodedDescription = decodeURIComponent(errorDescription);

        // 사용자 친화적인 메시지로 변환
        if (decodedDescription.includes("OAuth callback with invalid state")) {
          message = "로그인 세션이 만료되었습니다. 다시 시도해주세요.";
        } else if (decodedDescription.includes("bad_oauth_state")) {
          message = "로그인 상태가 유효하지 않습니다. 다시 시도해주세요.";
        } else {
          message = `로그인 오류: ${decodedDescription}`;
        }
      }

      alert(message);

      // URL에서 쿼리 파라미터 제거
      router.replace("/login");
    }
  }, [searchParams, router]);

  return null; // 아무것도 렌더링하지 않음
}
