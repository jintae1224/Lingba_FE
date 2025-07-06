import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 특정 박스 조회 API
export async function GET(request: NextRequest, { params }: RouteParams) {
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

    // user_box 테이블에서 박스 정보 조회
    const { data: boxData, error: boxError } = await supabase
      .from("user_box")
      .select(
        "id, name, color, position, is_default, user_id, created_at, updated_at"
      )
      .eq("id", boxId)
      .eq("user_id", user.id)
      .single();

    if (boxError || !boxData) {
      const response: ApiResponse = {
        success: false,
        message: "박스를 찾을 수 없거나 접근 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 추가 보안 검증
    if (boxData.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "접근 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    const response: ApiResponse<Box> = {
      success: true,
      message: "박스 정보 조회 성공",
      data: boxData,
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
