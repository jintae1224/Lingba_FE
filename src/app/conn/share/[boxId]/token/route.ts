import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 박스 토큰 조회 API
export async function GET(_: NextRequest, { params }: RouteParams) {
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

    // 박스 소유자인지 확인 (소유자만 토큰 조회 가능)
    const { data: boxData } = await supabase
      .from("user_box")
      .select("user_id")
      .eq("id", boxId)
      .single();

    if (!boxData || boxData.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "박스 토큰을 볼 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    // 현재 활성화된 토큰만 조회
    const { data: tokenData, error: tokenError } = await supabase
      .from("box_join")
      .select("id, box_id, join_token, status, expires_at")
      .eq("box_id", boxId)
      .eq("owner_id", user.id)
      .eq("status", "pending")
      .gt("expires_at", new Date().toISOString())
      .single();

    if (tokenError) {
      // 활성 토큰이 없는 경우 (정상적인 상황)
      if (tokenError.code === "PGRST116") {
        const response: ApiResponse = {
          success: true,
          message: "활성화된 토큰이 없습니다.",
          data: null,
        };
        return NextResponse.json(response);
      }

      const response: ApiResponse = {
        success: false,
        message: "토큰 조회에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<typeof tokenData> = {
      success: true,
      message: "활성 토큰 조회 성공",
      data: tokenData,
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