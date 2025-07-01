import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

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

    // 폴더 목록 조회 (position 순으로 정렬)
    const { data: folders, error } = await supabase
      .from("user_folder")
      .select("*")
      .eq("user_id", user.id)
      .eq("box_id", boxId)
      .order("parent_id", { ascending: true, nullsFirst: true })
      .order("position", { ascending: true });

    if (error) {
      console.error("Folder list error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch folders",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Folders fetched successfully",
      data: folders || [],
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
