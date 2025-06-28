import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { Box } from "@/types/user";
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

    // 현재 사용자의 ID 조회
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", user.email!)
      .single();

    if (userError || !userData) {
      const response: ApiResponse = {
        success: false,
        message: "사용자 정보를 찾을 수 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 사용자의 모든 박스 조회 (position 순으로 정렬)
    const { data: boxes, error: boxesError } = await supabase
      .from("boxes")
      .select(
        "id, name, color, position, is_default, owner_id, created_at, updated_at"
      )
      .eq("owner_id", userData.id)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (boxesError) {
      console.error("박스 목록 조회 오류:", boxesError);
      const response: ApiResponse = {
        success: false,
        message: "박스 목록 조회 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse<Box[]> = {
      success: true,
      message: "박스 목록 조회 성공",
      data: boxes || [],
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("박스 목록 조회 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
