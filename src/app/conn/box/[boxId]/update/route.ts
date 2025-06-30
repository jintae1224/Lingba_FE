import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 박스 수정 API
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

    const body = await request.json();
    const { name, color } = body;

    // 보안 강화: 먼저 user_box에서 박스 소유권 확인
    const { data: existingBox, error: checkError } = await supabase
      .from("user_box")
      .select("id, user_id, is_default")
      .eq("id", boxId)
      .eq("user_id", user.id)
      .single();

    if (checkError || !existingBox) {
      const response: ApiResponse = {
        success: false,
        message: "박스를 찾을 수 없거나 수정할 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 추가 보안 검증
    if (existingBox.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "수정 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    // 업데이트할 데이터 준비
    const updateData: { updated_at: string; name?: string; color?: string } = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        const response: ApiResponse = {
          success: false,
          message: "박스 이름은 비어있을 수 없습니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 400 });
      }
      updateData.name = name.trim();
    }

    if (color !== undefined) {
      updateData.color = color;
    }

    // 박스 업데이트 (이중 보안: 소유권 재확인)
    const { data: updatedBox, error: updateError } = await supabase
      .from("user_box")
      .update(updateData)
      .eq("id", boxId)
      .eq("user_id", user.id)
      .select(
        "id, name, color, position, is_default, user_id, created_at, updated_at"
      )
      .single();

    if (updateError || !updatedBox) {
      const response: ApiResponse = {
        success: false,
        message: "박스를 찾을 수 없거나 수정할 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Box> = {
      success: true,
      message: "박스가 성공적으로 수정되었습니다.",
      data: updatedBox,
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
