import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

// 로그아웃 API
export async function POST() {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      const response: ApiResponse = {
        success: false,
        message: "인증되지 않은 사용자입니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Supabase 로그아웃
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.error("로그아웃 오류:", signOutError);
      const response: ApiResponse = {
        success: false,
        message: "로그아웃에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "성공적으로 로그아웃되었습니다.",
      data: null,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("로그아웃 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}