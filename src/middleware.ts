import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Supabase 세션 업데이트
  const supabaseResponse = await updateSession(request);

  // 회원가입 페이지 접근 시 처리
  if (request.nextUrl.pathname === "/signup") {
    try {
      // Supabase 클라이언트 생성
      const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(_cookiesToSet) {
              // middleware에서는 쿠키 설정하지 않음
            },
          },
        }
      );

      // 현재 사용자 확인
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 사용자 정보 조회
        const { data: userData, error: fetchError } = await supabase
          .from("users")
          .select("nickname")
          .eq("id", user.id)
          .single();
        // 회원가입이 완료된 사용자라면 메인 페이지로 리다이렉트
        if (!fetchError && userData) {
          const url = request.nextUrl.clone();
          url.pathname = "/main";
          return NextResponse.redirect(url);
        } else {
          console.log("회원가입 미완료 사용자 - 회원가입 페이지 접근 허용");
        }
      } else {
        console.log("미로그인 사용자 - 회원가입 페이지 접근 허용");
      }
    } catch (error) {
      console.error("middleware 사용자 확인 실패:", error);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/signup",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
