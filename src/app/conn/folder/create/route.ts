import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
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

    const { name, color, box_id, parent_id, position } = await request.json();

    // 필수 필드 검증
    if (!name || !box_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and box_id are required",
          data: null,
        } as ApiResponse,
        { status: 400 }
      );
    }

    // 폴더 생성
    const { data: folder, error } = await supabase
      .from("user_folder")
      .insert({
        name,
        color,
        user_id: user.id,
        box_id,
        parent_id,
        position: position || 0,
        is_expanded: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Folder creation error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create folder",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Folder created successfully",
      data: folder,
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
