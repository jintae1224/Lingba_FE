import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// visited_box 업데이트 API
export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

    // 박스가 현재 사용자의 것인지 확인
    const { data: boxData, error: boxError } = await supabase
      .from("boxes")
      .select("id, name")
      .eq("id", boxId)
      .eq("user_id", userData.id)
      .single();

    if (boxError || !boxData) {
      const response: ApiResponse = {
        success: false,
        message: "박스를 찾을 수 없거나 접근 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // visited_box 업데이트
    const { error: updateError } = await supabase
      .from("users")
      .update({ visited_box: boxId })
      .eq("id", userData.id);

    if (updateError) {
      console.error("visited_box 업데이트 오류:", updateError);
      const response: ApiResponse = {
        success: false,
        message: "박스 방문 기록 업데이트 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: `${boxData.name} 박스로 이동했습니다.`,
      data: { boxId, boxName: boxData.name },
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("박스 방문 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
