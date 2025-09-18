import { createClient as createServiceClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

// 계정 삭제 API
export async function DELETE() {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
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

    // 서비스 클라이언트 설정
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

    // 1. 해당 사용자와 관련된 box_shares 데이터 삭제 (member_id 또는 owner_id)
    const { error: deleteSharesError } = await serviceClient
      .from("box_shares")
      .delete()
      .or(`member_id.eq.${user.id},owner_id.eq.${user.id}`);

    if (deleteSharesError) {
      console.error("공유 데이터 삭제 오류:", deleteSharesError);
      const response: ApiResponse = {
        success: false,
        message: "공유 데이터 삭제에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    // 2. users 테이블에서 사용자 데이터 삭제
    const { error: deleteUserError } = await serviceClient
      .from("users")
      .delete()
      .eq("id", user.id);

    if (deleteUserError) {
      console.error("사용자 데이터 삭제 오류:", deleteUserError);
      const response: ApiResponse = {
        success: false,
        message: "사용자 데이터 삭제에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    // 3. Supabase Auth에서 계정 삭제
    const { error: deleteAuthError } = await serviceClient.auth.admin.deleteUser(
      user.id
    );

    if (deleteAuthError) {
      console.error("계정 삭제 오류:", deleteAuthError);
      const response: ApiResponse = {
        success: false,
        message: "계정 삭제에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "계정이 성공적으로 삭제되었습니다.",
      data: null,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("계정 삭제 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}