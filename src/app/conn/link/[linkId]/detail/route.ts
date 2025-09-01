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
    const { data: boxOwner } = await supabase
      .from("user_box")
      .select("id")
      .eq("id", boxId)
      .eq("user_id", user.id)
      .maybeSingle();

    const { data: boxMember } = await supabase
      .from("box_shares")
      .select("box_id")
      .eq("box_id", boxId)
      .eq("member_id", user.id)
      .maybeSingle();

    if (!boxOwner && !boxMember) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Forbidden: You do not have permission to access this resource.",
          data: null,
        } as ApiResponse,
        { status: 403 }
      );
    }

    // 링크 조회 (같은 박스 안에 있는 링크)
    const { data: link, error } = await supabase
      .from("user_link")
      .select("*")
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
      isPin: !!pinData
    };

    return NextResponse.json({
      success: true,
      message: "Link fetched successfully",
      data: linkWithPin,
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
