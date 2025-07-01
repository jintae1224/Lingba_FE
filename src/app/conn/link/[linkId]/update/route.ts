import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import type { ApiResponse } from "@/types/api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    const supabase = await createClient();
    const { linkId } = await params;

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

    const {
      url,
      title,
      description,
      parent_id,
      ai_summary,
      ai_tags,
      favicon_url,
      thumbnail_url,
      position,
      is_public,
    } = await request.json();

    // domain 업데이트 (url이 변경된 경우)
    let domain = undefined;
    if (url) {
      try {
        const urlObj = new URL(url);
        domain = urlObj.hostname;
      } catch {
        domain = null;
      }
    }

    // 링크 수정
    const { data: link, error } = await supabase
      .from("user_link")
      .update({
        ...(url !== undefined && { url }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(parent_id !== undefined && { parent_id }),
        ...(ai_summary !== undefined && { ai_summary }),
        ...(ai_tags !== undefined && { ai_tags }),
        ...(favicon_url !== undefined && { favicon_url }),
        ...(thumbnail_url !== undefined && { thumbnail_url }),
        ...(domain !== undefined && { domain }),
        ...(position !== undefined && { position }),
        ...(is_public !== undefined && { is_public }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", linkId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Link update error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update link",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          message: "Link not found",
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Link updated successfully",
      data: link,
    } as ApiResponse);
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
