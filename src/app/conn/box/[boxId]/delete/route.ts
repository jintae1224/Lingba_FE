import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 박스 삭제 API
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
      .select("id, user_id, is_default, name")
      .eq("id", boxId)
      .eq("user_id", user.id)
      .single();

    if (checkError || !existingBox) {
      const response: ApiResponse = {
        success: false,
        message: "박스를 찾을 수 없거나 삭제할 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 추가 보안 검증
    if (existingBox.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "삭제 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    // 기본 박스는 삭제할 수 없음
    if (existingBox.is_default) {
      const response: ApiResponse = {
        success: false,
        message: "기본 박스는 삭제할 수 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 박스 삭제 (이중 보안: 소유권 재확인)
    const { error: deleteError } = await supabase
      .from("user_box")
      .delete()
      .eq("id", boxId)
      .eq("user_id", user.id);

    if (deleteError) {
      const response: ApiResponse = {
        success: false,
        message: "박스 삭제 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: `'${existingBox.name}' 박스가 성공적으로 삭제되었습니다.`,
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
