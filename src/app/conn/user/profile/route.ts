import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

// 사용자 프로필 수정 API (nickname, color)
export async function PATCH(request: NextRequest) {
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

    // 요청 body 파싱
    const body = await request.json();
    const { nickname, color } = body;

    // 업데이트할 데이터 준비
    const updateData: {
      updated_at: string;
      nickname?: string;
      color?: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    // nickname 유효성 검사
    if (nickname !== undefined) {
      if (typeof nickname !== "string" || nickname.trim().length === 0) {
        const response: ApiResponse = {
          success: false,
          message: "닉네임은 비어있을 수 없습니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 400 });
      }

      if (nickname.trim().length > 20) {
        const response: ApiResponse = {
          success: false,
          message: "닉네임은 20자를 초과할 수 없습니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 400 });
      }

      updateData.nickname = nickname.trim();
    }

    // color 유효성 검사
    if (color !== undefined) {
      if (typeof color !== "string") {
        const response: ApiResponse = {
          success: false,
          message: "유효하지 않은 색상값입니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 400 });
      }
      updateData.color = color;
    }

    // 디버깅: 사용자 정보 로그
    console.log("=== 프로필 업데이트 디버깅 ===");
    console.log("Auth user:", {
      id: user.id,
      email: user.email,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata
    });
    console.log("업데이트 데이터:", updateData);

    // 먼저 해당 사용자가 users 테이블에 존재하는지 확인
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    console.log("기존 사용자 조회 결과:", { existingUser, checkError });

    if (checkError) {
      console.error("사용자 존재 확인 오류:", checkError);
    }

    if (!existingUser) {
      console.log("users 테이블에 해당 사용자가 없음 - email로도 확인해보기");

      const { data: userByEmail, error: emailCheckError } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email!)
        .maybeSingle();

      console.log("이메일로 사용자 조회 결과:", { userByEmail, emailCheckError });
    }

    // 사용자 프로필 업데이트
    const { error: updateError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", user.id);

    if (updateError) {
      console.error("프로필 업데이트 실패:", updateError);
      const response: ApiResponse = {
        success: false,
        message: "프로필 업데이트에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "프로필이 성공적으로 업데이트되었습니다.",
      data: null,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("프로필 업데이트 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}