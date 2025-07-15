import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    const supabase = await createClient();
    const { folderId } = await params;

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

    const { name, color, position, is_expanded, parent_id } =
      await request.json();

    // 폴더 수정
    const { data: folder, error } = await supabase
      .from("user_folder")
      .update({
        ...(name !== undefined && { name }),
        ...(color !== undefined && { color }),
        ...(position !== undefined && { position }),
        ...(is_expanded !== undefined && { is_expanded }),
        ...(parent_id !== undefined && { parent_id }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", folderId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Folder update error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update folder",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    if (!folder) {
      return NextResponse.json(
        {
          success: false,
          message: "Folder not found",
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Folder updated successfully",
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
