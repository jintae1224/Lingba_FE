import { createClient as createServiceClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 박스 공유 멤버 조회 API
export async function GET(_: NextRequest, { params }: RouteParams) {
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

    // 박스 소유권 확인
    const { data: boxData, error: boxError } = await supabase
      .from("user_box")
      .select("id, user_id")
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

    // 박스 공유 목록 조회 - RLS 우회를 위해 서비스 클라이언트 사용
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      const response: ApiResponse = {
        success: false,
        message: "서버 설정 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }
    
    const serviceClient = createServiceClient(supabaseUrl, supabaseServiceKey);
    
    const { data: sharesData, error: sharesError } = await serviceClient
      .from("box_shares")
      .select("id, member_id, users!member_id(nickname, color)")
      .eq("box_id", boxId);

    if (sharesError) {
      console.error("Box shares query error:", sharesError);
      const response: ApiResponse = {
        success: false,
        message: `공유 멤버 조회 중 오류가 발생했습니다: ${sharesError.message}`,
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const members = sharesData?.map(share => {
      const userProfile = Array.isArray(share.users) ? share.users[0] : share.users;
      return {
        id: share.id,
        user_id: share.member_id,
        nickname: userProfile?.nickname || "알 수 없음",
        color: userProfile?.color
      };
    }) || [];

    const response: ApiResponse<typeof members> = {
      success: true,
      message: "박스 공유 멤버 조회 성공",
      data: members,
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