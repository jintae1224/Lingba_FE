import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { SignupData } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 현재 로그인된 사용자 정보 가져오기
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

    // 요청 데이터 파싱
    const body: SignupData = await request.json();
    const {
      nickname,
      gender,
      ageGroup,
      color,
      termsAccepted,
      privacyAccepted,
    } = body;

    // 데이터 유효성 검사
    if (!nickname?.trim()) {
      const response: ApiResponse = {
        success: false,
        message: "닉네임은 필수입니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!gender || !ageGroup || !color) {
      const response: ApiResponse = {
        success: false,
        message: "성별, 연령대, 색상은 필수입니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!termsAccepted || !privacyAccepted) {
      const response: ApiResponse = {
        success: false,
        message: "서비스 이용약관과 개인정보처리방침에 동의해야 합니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // OAuth 정보 추출
    const provider = user.app_metadata?.provider || "unknown";
    const providerId = user.id;

    // 트랜잭션으로 사용자와 기본 박스를 원자적으로 생성
    const { data: result, error: rpcError } = await supabase.rpc(
      "create_user_with_box",
      {
        p_email: user.email!,
        p_nickname: nickname.trim(),
        p_gender: gender,
        p_age_group: ageGroup,
        p_color: color,
        p_provider: provider,
        p_provider_id: providerId,
        p_terms_accepted: termsAccepted,
        p_privacy_accepted: privacyAccepted,
        p_name:
          user.user_metadata?.full_name || user.user_metadata?.name || null,
      }
    );

    if (rpcError) {
      console.error("회원가입 트랜잭션 오류:", rpcError);

      // 에러 메시지에 따른 적절한 응답
      if (rpcError.message?.includes("NICKNAME_DUPLICATE")) {
        const response: ApiResponse = {
          success: false,
          message: "이미 사용 중인 닉네임입니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 409 });
      }

      if (rpcError.message?.includes("EMAIL_DUPLICATE")) {
        const response: ApiResponse = {
          success: false,
          message: "이미 가입된 계정입니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 409 });
      }

      const response: ApiResponse = {
        success: false,
        message: "회원가입 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    if (!result || !result.success) {
      console.error("회원가입 결과 오류:", result);
      const response: ApiResponse = {
        success: false,
        message: "회원가입 처리 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "회원가입이 완료되었습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("회원가입 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
