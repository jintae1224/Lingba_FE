import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";
import { createClient } from "@/utils/supabase/server";

// 사용자의 박스 목록 조회 API
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

    // user_box 테이블에서 사용자의 모든 박스 조회 (RLS 정책에 의해 자동 필터링)
    const { data: boxes, error: boxesError } = await supabase
      .from("user_box")
      .select(
        "id, name, color, position, is_default, user_id, created_at, updated_at"
      )
      .eq("user_id", user.id)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (boxesError) {
      const response: ApiResponse = {
        success: false,
        message: "박스 목록 조회 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    // 보안 검증: 반환된 모든 박스가 현재 사용자 소유인지 확인
    if (boxes) {
      const invalidBoxes = boxes.filter((box) => box.user_id !== user.id);
      if (invalidBoxes.length > 0) {
        const response: ApiResponse<Box[]> = {
          success: true,
          message: "박스 목록 조회 성공",
          data: [],
        };
        return NextResponse.json(response);
      }
    }

    // 박스가 없는 경우 기본 박스 자동 생성
    if (!boxes || boxes.length === 0) {
      const { data: newBox, error: createError } = await supabase
        .from("user_box")
        .insert({
          name: "나의 첫 번째 박스",
          color: "#3b82f6",
          user_id: user.id,
          position: 1,
          is_default: true,
        })
        .select(
          "id, name, color, position, is_default, user_id, created_at, updated_at"
        )
        .single();

      if (!createError && newBox) {
        const response: ApiResponse<Box[]> = {
          success: true,
          message: "박스 목록 조회 성공",
          data: [newBox],
        };
        return NextResponse.json(response);
      }
    }

    const response: ApiResponse<Box[]> = {
      success: true,
      message: "박스 목록 조회 성공",
      data: boxes || [],
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
