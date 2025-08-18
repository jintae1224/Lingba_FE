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
    const parentId = searchParams.get("parent_id");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

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

    // 폴더 쿼리 설정
    let folderQuery = supabase
      .from("user_folder")
      .select("*")
      .eq("user_id", user.id)
      .eq("box_id", boxId);

    // 링크 쿼리 설정
    let linkQuery = supabase
      .from("user_link")
      .select("*")
      .eq("user_id", user.id)
      .eq("box_id", boxId);

    // parent_id 필터링
    if (parentId === "null" || parentId === null || !parentId) {
      // 박스 직속 아이템들 (폴더에 속하지 않음)
      folderQuery = folderQuery.is("parent_id", null);
      linkQuery = linkQuery.is("parent_id", null);
    } else {
      // 특정 폴더 안의 아이템들
      folderQuery = folderQuery.eq("parent_id", parentId);
      linkQuery = linkQuery.eq("parent_id", parentId);
    }

    // 데이터 조회
    const [foldersResult, linksResult] = await Promise.all([
      folderQuery.order("position", { ascending: true }).order("created_at", { ascending: false }),
      linkQuery.order("position", { ascending: true }).order("created_at", { ascending: false })
    ]);

    const { data: folders, error: foldersError } = foldersResult;
    const { data: links, error: linksError } = linksResult;

    if (foldersError) {
      console.error("Folders fetch error:", foldersError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch folders",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    if (linksError) {
      console.error("Links fetch error:", linksError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch links",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    // 폴더와 링크를 하나의 배열로 합치고 type 필드 추가
    const allItems = [
      ...(folders || []).map(folder => ({ ...folder, type: "folder" as const })),
      ...(links || []).map(link => ({ ...link, type: "link" as const }))
    ];

    // 폴더 우선, 그 다음 position, 마지막으로 created_at으로 정렬
    allItems.sort((a, b) => {
      // 1. 타입 우선 정렬 (폴더가 링크보다 먼저)
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1;
      }
      
      // 2. 같은 타입 내에서 position 우선 정렬
      if (a.position !== b.position) {
        return (a.position || 999999) - (b.position || 999999);
      }
      
      // 3. position이 같으면 created_at 최신순
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    // 페이지네이션 적용
    const total = allItems.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedItems = allItems.slice(offset, offset + limit);

    const response = {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Bookmarks fetched successfully",
      data: response,
    } as ApiResponse);
  } catch (error) {
    console.error("Bookmark list API error:", error);
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