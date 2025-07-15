import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
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
          message: "인증이 필요합니다.",
          data: null,
        } as ApiResponse,
        { status: 401 }
      );
    }

    // 폴더 정보 조회
    const { data: folderData, error: folderError } = await supabase
      .from("user_folder")
      .select("*")
      .eq("id", folderId)
      .eq("user_id", user.id)
      .single();

    if (folderError || !folderData) {
      return NextResponse.json(
        {
          success: false,
          message: "폴더를 찾을 수 없습니다.",
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    // 하위 폴더가 있는지 확인
    const { data: subFolders, error: subFoldersError } = await supabase
      .from("user_folder")
      .select("id")
      .eq("parent_id", folderId)
      .eq("user_id", user.id)
      .limit(1);

    if (subFoldersError) {
      console.error("Error checking subfolders:", subFoldersError);
      return NextResponse.json(
        {
          success: false,
          message: "하위 폴더 확인 중 오류가 발생했습니다.",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    // 하위 링크가 있는지 확인
    const { data: subLinks, error: subLinksError } = await supabase
      .from("user_link")
      .select("id")
      .eq("parent_id", folderId)
      .eq("user_id", user.id)
      .limit(1);

    if (subLinksError) {
      console.error("Error checking sublinks:", subLinksError);
      return NextResponse.json(
        {
          success: false,
          message: "하위 링크 확인 중 오류가 발생했습니다.",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    // 하위 항목이 있으면 삭제 불가
    if (subFolders && subFolders.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "하위 폴더가 있어 삭제할 수 없습니다. 먼저 하위 폴더를 삭제해주세요.",
          data: null,
        } as ApiResponse,
        { status: 400 }
      );
    }

    if (subLinks && subLinks.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "하위 링크가 있어 삭제할 수 없습니다. 먼저 하위 링크를 삭제해주세요.",
          data: null,
        } as ApiResponse,
        { status: 400 }
      );
    }

    // 폴더 삭제 (하위 항목이 없는 경우에만 삭제)
    const { error } = await supabase
      .from("user_folder")
      .delete()
      .eq("id", folderId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Folder delete error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "폴더 삭제에 실패했습니다.",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "폴더가 성공적으로 삭제되었습니다.",
      data: null,
    } as ApiResponse);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "서버 내부 오류가 발생했습니다.",
        data: null,
      } as ApiResponse,
      { status: 500 }
    );
  }
}
