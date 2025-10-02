import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import type { Link } from "@/types/link";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    const supabase = await createClient();
    const { linkId } = await params;
    const boxId = request.nextUrl.searchParams.get("boxId");

    // 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          data: null,
        } as ApiResponse,
        { status: 401 }
      );
    }

    // 링크 ID 또는 박스 ID 검증
    if (!linkId || !boxId) {
      return NextResponse.json(
        {
          success: false,
          message: "Link ID and Box ID are required",
          data: null,
        } as ApiResponse,
        { status: 400 }
      );
    }

    // 박스 접근 권한 확인 (소유자 또는 멤버)
    const [boxOwnerResult, boxShareResult] = await Promise.all([
      // 소유자 확인
      supabase
        .from("user_box")
        .select("id")
        .eq("id", boxId)
        .eq("user_id", user.id)
        .maybeSingle(),
      // 공유받은 사용자 확인
      supabase
        .from("box_shares")
        .select("id")
        .eq("box_id", boxId)
        .eq("member_id", user.id)
        .maybeSingle(),
    ]);

    const { data: boxOwner } = boxOwnerResult;
    const { data: boxMember } = boxShareResult;

    const isOwner = !!boxOwner;
    const isSharedMember = !!boxMember;
    const hasAccess = isOwner || isSharedMember;

    if (!hasAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Box not found or access denied",
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    // 링크 조회 (parent 정보 포함)
    const { data: link, error } = await supabase
      .from("user_link")
      .select("*, parent:parent_id(id, name)")
      .eq("id", linkId)
      .eq("box_id", boxId)
      .single();

    if (error) {
      console.error("Link fetch error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Link not found",
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    // 링크의 pin 여부 조회
    const { data: pinData, error: pinError } = await supabase
      .from("user_link_pin")
      .select("id")
      .eq("link_id", linkId)
      .eq("box_id", boxId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (pinError) {
      console.error("Pin data fetch error:", pinError);
    }

    const linkWithPin = {
      ...link,
      isPin: !!pinData,
      isOwner: link.user_id === user.id,
    };

    // user_id와 parent_id는 클라이언트로 전송하지 않음 (parent 객체에 포함됨)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user_id: _, parent_id: __, ...linkWithoutSensitiveData } = linkWithPin;

    return NextResponse.json({
      success: true,
      message: "Link fetched successfully",
      data: linkWithoutSensitiveData,
    } as ApiResponse<Link>);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: null,
      } as ApiResponse,
      { status: 500 }
    );
  }
}
