import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { UserProfile } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

// 사용자 정보 조회 API
export async function GET() {
  try {
    const supabase = await createClient();

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

    // 사용자 정보 조회
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("nickname, gender, age_group, provider, color, visited_box")
      .eq("email", user.email!)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        const response: ApiResponse = {
          success: false,
          message: "등록되지 않은 사용자입니다.",
          data: { needsSignup: true },
        };
        return NextResponse.json(response, { status: 404 });
      }
      console.error("사용자 정보 조회 오류:", fetchError);
      const response: ApiResponse = {
        success: false,
        message: "서버 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<UserProfile> = {
      success: true,
      message: "사용자 정보 조회 성공",
      data: userData,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("사용자 조회 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
