import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 박스 방문 기록 업데이트 API
export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

    // 보안 강화: 먼저 user_box에서 박스 소유권 확인
    const { data: existingBox, error: checkError } = await supabase
      .from("user_box")
      .select("id, user_id")
      .eq("id", boxId)
      .eq("user_id", user.id)
      .single();

    if (checkError || !existingBox) {
      const response: ApiResponse = {
        success: false,
        message: "박스를 찾을 수 없거나 접근 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 추가 보안 검증
    if (existingBox.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "접근 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    // 박스 방문 시간 업데이트
    const { error: updateError } = await supabase
      .from("user_box")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq("id", boxId)
      .eq("user_id", user.id);

    if (updateError) {
      const response: ApiResponse = {
        success: false,
        message: "박스 방문 기록 업데이트 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "박스 방문 기록이 업데이트되었습니다.",
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
