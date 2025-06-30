import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";
import { createClient } from "@/utils/supabase/server";

// 새 박스 생성 API
export async function POST(request: Request) {
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

    const body = await request.json();
    const { name, color } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      const response: ApiResponse = {
        success: false,
        message: "박스 이름은 필수입니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 다음 position 값 계산 (user_box 테이블에서)
    const { data: lastBox } = await supabase
      .from("user_box")
      .select("position")
      .eq("user_id", user.id)
      .order("position", { ascending: false })
      .limit(1)
      .single();

    const nextPosition = (lastBox?.position || 0) + 1;

    // 새 박스 생성 - user_box 테이블에
    const { data: newBox, error: createError } = await supabase
      .from("user_box")
      .insert({
        name: name.trim(),
        color: color || "#3b82f6",
        user_id: user.id,
        position: nextPosition,
        is_default: false,
      })
      .select(
        "id, name, color, position, is_default, user_id, created_at, updated_at"
      )
      .single();

    if (createError) {
      const response: ApiResponse = {
        success: false,
        message: "박스 생성 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    // 추가 보안 검증: 생성된 박스의 소유권 확인
    if (newBox.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "박스 생성 중 보안 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<Box> = {
      success: true,
      message: "박스가 성공적으로 생성되었습니다.",
      data: newBox,
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
