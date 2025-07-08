import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. 서버 환경 변수 확인
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      return NextResponse.json(
        {
          success: false,
          message: "서버 환경 변수가 올바르게 설정되지 않았습니다.",
          data: null,
        },
        { status: 500 }
      );
    }

    // 2. 사용자 인증 클라이언트 생성 및 유저 정보 확인
    const cookieStore = await cookies();
    const supabaseUserClient = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseUserClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, message: "로그인이 필요합니다.", data: null },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { join_token } = body;

    // 3. 입력값 검증
    if (
      !join_token ||
      typeof join_token !== "string" ||
      join_token.length !== 32
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "유효한 토큰을 입력해주세요.",
          data: null,
        },
        { status: 400 }
      );
    }

    // 4. RLS 우회를 위한 서비스 역할(관리자) 클라이언트 생성
    const supabaseAdminClient = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: { persistSession: false },
      }
    );

    // 5. [Admin] 토큰 조회 및 검증
    const { data: join, error: joinError } =
      await supabaseAdminClient
        .from("box_join")
        .select(
          `
        *,
        user_box:box_id (
          id,
          name,
          color,
          user_id
        )
      `
        )
        .eq("join_token", join_token)
        .single();

    if (joinError || !join) {
      return NextResponse.json(
        {
          success: false,
          message: "토큰이 유효하지 않습니다.",
          data: null,
        },
        { status: 404 }
      );
    }

    // 6. [Admin] 토큰 유효성 검증 (본인, 만료, 사용 여부)
    if (join.owner_id === user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "자신이 만든 토큰은 사용할 수 없습니다.",
          data: null,
        },
        { status: 400 }
      );
    }

    if (new Date(join.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, message: "만료된 토큰입니다.", data: null },
        { status: 410 }
      );
    }

    if (join.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message: "이미 사용되었거나 유효하지 않은 토큰입니다.",
          data: null,
        },
        { status: 410 }
      );
    }

    // 7. [Admin] 이미 참여한 박스인지 확인
    const { data: existingShare } = await supabaseAdminClient
      .from("box_shares")
      .select("id")
      .eq("box_id", join.box_id)
      .eq("member_id", user.id)
      .single();

    if (existingShare) {
      return NextResponse.json(
        {
          success: false,
          message: "이미 참여하고 있는 박스입니다.",
          data: null,
        },
        { status: 409 }
      );
    }

    // 8. [Admin] box_shares 테이블에 새 공유 레코드 추가
    const { data: newShare, error: shareError } = await supabaseAdminClient
      .from("box_shares")
      .insert({
        box_id: join.box_id,
        member_id: user.id,
        owner_id: join.owner_id,
      })
      .select(
        `
        *,
        user_box:box_id (
          id,
          name,
          color,
          user_id
        )
      `
      )
      .single();

    if (shareError || !newShare) {
      return NextResponse.json(
        { success: false, message: "박스 참여에 실패했습니다.", data: null },
        { status: 500 }
      );
    }

    // 9. [Admin] box_join 테이블 업데이트
    await supabaseAdminClient
      .from("box_join")
      .update({
        status: "accepted",
        used_by_user_id: user.id,
        used_at: new Date().toISOString(),
      })
      .eq("id", join.id);

    return NextResponse.json({
      success: true,
      message: "박스에 성공적으로 참여했습니다!",
      data: newShare,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 서버 오류가 발생했습니다.";
    return NextResponse.json(
      { success: false, message: errorMessage, data: null },
      { status: 500 }
    );
  }
}