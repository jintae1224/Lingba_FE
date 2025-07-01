import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface BreadcrumbItem {
  id: string;
  name: string;
  parent_id: string | null;
}

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
    const folderId = searchParams.get("folder_id");
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

    // 폴더 ID가 없으면 빈 breadcrumb 반환 (루트)
    if (!folderId) {
      return NextResponse.json({
        success: true,
        message: "Root breadcrumb",
        data: [],
      } as ApiResponse);
    }

    // 폴더 경로를 역순으로 추적
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentFolderId: string | null = folderId;

    while (currentFolderId) {
      const { data, error } = await supabase
        .from("user_folder")
        .select("id, name, parent_id")
        .eq("id", currentFolderId)
        .eq("user_id", user.id)
        .eq("box_id", boxId)
        .single();

      const folder = data as BreadcrumbItem | null;

      if (error || !folder) {
        console.error("Folder not found:", currentFolderId, error);
        break;
      }

      breadcrumbs.unshift({
        id: folder.id,
        name: folder.name,
        parent_id: folder.parent_id,
      });

      currentFolderId = folder.parent_id;
    }

    return NextResponse.json({
      success: true,
      message: "Breadcrumb retrieved successfully",
      data: breadcrumbs,
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
