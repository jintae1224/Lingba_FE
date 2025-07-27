import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

interface RevokeMemberRequest {
  memberId: string;
}

// 박스 멤버 방출 API
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

    // 요청 body 파싱
    const body: RevokeMemberRequest = await request.json();
    const { memberId } = body;

    if (!memberId) {
      const response: ApiResponse = {
        success: false,
        message: "memberId가 필요합니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 박스 소유권 확인 (소유자만 멤버 방출 가능)
    const { data: boxData } = await supabase
      .from("user_box")
      .select("user_id")
      .eq("id", boxId)
      .single();

    if (!boxData || boxData.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "박스 멤버를 방출할 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    // 해당 공유가 존재하는지 확인
    const { data: shareData, error: shareError } = await supabase
      .from("box_shares")
      .select("id, box_id, member_id")
      .eq("box_id", boxId)
      .eq("member_id", memberId)
      .single();

    if (shareError || !shareData) {
      const response: ApiResponse = {
        success: false,
        message: "방출할 멤버를 찾을 수 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 공유 삭제 (멤버 방출)
    const { error: deleteError } = await supabase
      .from("box_shares")
      .delete()
      .eq("id", shareData.id);

    if (deleteError) {
      const response: ApiResponse = {
        success: false,
        message: "멤버 방출에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "멤버가 성공적으로 방출되었습니다.",
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