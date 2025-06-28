import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 특정 박스 정보 조회 API
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { boxId } = await params;
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

    // 박스 정보 조회 (소유 박스 + 공유받은 박스)
    const { data: boxData, error: boxError } = await supabase
      .from("boxes")
      .select(
        "id, name, color, position, is_default, owner_id, created_at, updated_at"
      )
      .eq("id", boxId)
      .single();

    if (boxError || !boxData) {
      const response: ApiResponse = {
        success: false,
        message: "박스를 찾을 수 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 박스 접근 권한 확인 (소유자 또는 멤버)
    let hasAccess = false;

    // 1. 소유자인지 확인
    if (boxData.owner_id === userData.id) {
      hasAccess = true;
    } else {
      // 2. 박스 멤버인지 확인
      const { data: memberData, error: memberError } = await supabase
        .from("box_members")
        .select("id")
        .eq("box_id", boxId)
        .eq("user_id", userData.id)
        .single();

      if (!memberError && memberData) {
        hasAccess = true;
      }
    }

    if (!hasAccess) {
      const response: ApiResponse = {
        success: false,
        message: "박스에 접근할 권한이 없습니다.",
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
  } catch (error) {
    console.error("박스 조회 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
