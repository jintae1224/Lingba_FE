import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 박스 토큰 폐기 API
export async function DELETE(_: NextRequest, { params }: RouteParams) {
  const { boxId } = await params;

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

    // 박스 소유자인지 확인 (소유자만 토큰 폐기 가능)
    const { data: boxData } = await supabase
      .from("user_box")
      .select("user_id")
      .eq("id", boxId)
      .single();

    if (!boxData || boxData.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "박스 토큰을 폐기할 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    // 현재 활성화된 토큰 조회
    const { data: tokenData, error: tokenError } = await supabase
      .from("box_join")
      .select("id, status")
      .eq("box_id", boxId)
      .eq("owner_id", user.id)
      .eq("status", "pending")
      .gt("expires_at", new Date().toISOString())
      .single();

    if (tokenError || !tokenData) {
      const response: ApiResponse = {
        success: false,
        message: "폐기할 활성 토큰을 찾을 수 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 이미 사용된 토큰은 폐기할 수 없음
    if (tokenData.status === "accepted") {
      const response: ApiResponse = {
        success: false,
        message: "이미 사용된 토큰은 폐기할 수 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 토큰 폐기 (소프트 삭제 - 상태를 cancelled로 변경)
    const { error: discardError } = await supabase
      .from("box_join")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", tokenData.id);

    if (discardError) {
      const response: ApiResponse = {
        success: false,
        message: "토큰 폐기에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "토큰이 성공적으로 폐기되었습니다.",
      data: null,
    };
    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}