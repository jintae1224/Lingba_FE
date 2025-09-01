import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    const supabase = await createClient();
    const { linkId } = await params;
    const { box_id: boxId } = await request.json();

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

    // linkId, boxId 검증
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
          message: "Forbidden: You do not have permission to access this resource.",
          data: null,
        } as ApiResponse,
        { status: 403 }
      );
    }

    // 링크가 해당 박스에 속하는지 확인
    const { data: link, error: linkError } = await supabase
      .from("user_link")
      .select("id, box_id")
      .eq("id", linkId)
      .eq("box_id", boxId)
      .maybeSingle();

    if (linkError || !link) {
      return NextResponse.json(
        {
          success: false,
          message: "Link not found in this box",
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    // 현재 pin 상태 확인
    const { data: existingPin, error: pinCheckError } = await supabase
      .from("user_link_pin")
      .select("id")
      .eq("user_id", user.id)
      .eq("box_id", boxId)
      .eq("link_id", linkId)
      .maybeSingle();

    if (pinCheckError) {
      console.error("Pin check error:", pinCheckError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to check pin status",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    if (existingPin) {
      // 이미 pin되어 있으면 제거
      const { error: deleteError } = await supabase
        .from("user_link_pin")
        .delete()
        .eq("id", existingPin.id);

      if (deleteError) {
        console.error("Pin delete error:", deleteError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to unpin link",
            data: null,
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Link unpinned successfully",
        data: { isPin: false },
      } as ApiResponse);
    } else {
      // pin되어 있지 않으면 추가
      const { error: insertError } = await supabase
        .from("user_link_pin")
        .insert({
          user_id: user.id,
          box_id: boxId,
          link_id: linkId,
        });

      if (insertError) {
        console.error("Pin insert error:", insertError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to pin link",
            data: null,
          } as ApiResponse,
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Link pinned successfully",
        data: { isPin: true },
      } as ApiResponse);
    }
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