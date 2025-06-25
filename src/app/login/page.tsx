"use client";

import oAuthSignIn from "@/utils/supabase/login";

export default function LoginPage() {
  const onClickGoogleLogin = async () => {
    oAuthSignIn({
      provider: "google",
    });
  };

  return (
    <div>
      <button onClick={onClickGoogleLogin}>구글로 로그인</button>
    </div>
  );
}
