import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import type { ApiResponse } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

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

    const { searchParams } = new URL(request.url);
    const boxId = searchParams.get("box_id");
    const parentId = searchParams.get("parent_id"); // null이면 박스 직속, 값이 있으면 폴더 안

    if (!boxId) {
      return NextResponse.json(
        {
          success: false,
          message: "box_id is required",
          data: null,
        } as ApiResponse,
        { status: 400 }
      );
    }

    let query = supabase
      .from("user_link")
      .select("*")
      .eq("user_id", user.id)
      .eq("box_id", boxId)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });

    // parent_id 필터링
    if (parentId === "null" || parentId === null) {
      // 박스 직속 링크들 (폴더에 속하지 않음)
      query = query.is("parent_id", null);
    } else if (parentId) {
      // 특정 폴더 안의 링크들
      query = query.eq("parent_id", parentId);
    }
    // parentId가 undefined이면 모든 링크 조회

    const { data: links, error } = await query;

    if (error) {
      console.error("Link list error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch links",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Links fetched successfully",
      data: links || [],
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
