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

    // Box 접근 권한 확인 - 소유자이거나 공유받은 사용자인지 확인
    const [boxOwnerResult, boxShareResult] = await Promise.all([
      // 소유자 확인
      supabase
        .from("user_box")
        .select("id, user_id")
        .eq("id", boxId)
        .eq("user_id", user.id)
        .maybeSingle(),
      // 공유받은 사용자 확인
      supabase
        .from("box_shares")
        .select("id")
        .eq("box_id", boxId)
        .eq("member_id", user.id)
        .maybeSingle(),
    ]);

    const { data: boxData } = boxOwnerResult;
    const { data: shareData } = boxShareResult;

    const isOwner = !!boxData;
    const isSharedMember = !!shareData;
    const hasAccess = isOwner || isSharedMember;

    if (!hasAccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Box not found or access denied",
          data: null,
        } as ApiResponse,
        { status: 404 }
      );
    }

    // 폴더 쿼리 설정 - 최적화된 필드만 선택 + user_id 포함
    let folderQuery = supabase
      .from("user_folder")
      .select("id, name, updated_at, position, created_at, user_id")
      .eq("box_id", boxId);

    // 링크 쿼리 설정 - 최적화된 필드만 선택 + user_id 포함
    let linkQuery = supabase
      .from("user_link")
      .select(
        "id, url, title, thumbnail_url, favicon_url, position, created_at, user_id"
      )
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
      folderQuery
        .order("position", { ascending: true })
        .order("created_at", { ascending: false }),
      linkQuery
        .order("position", { ascending: true })
        .order("created_at", { ascending: false }),
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

    // 링크의 pin 여부 조회
    let linksWithPin = links || [];
    if (links && links.length > 0) {
      const linkIds = links.map((link) => link.id);

      const { data: pinData, error: pinError } = await supabase
        .from("user_link_pin")
        .select("link_id")
        .in("link_id", linkIds)
        .eq("user_id", user.id)
        .eq("box_id", boxId);

      if (pinError) {
        console.error("Pin data fetch error:", pinError);
      }

      const pinnedLinkIds = new Set(pinData?.map((pin) => pin.link_id) || []);

      linksWithPin = links.map((link) => ({
        ...link,
        isPin: pinnedLinkIds.has(link.id),
      }));
    }

    // 폴더와 링크를 하나의 배열로 합치고 type 필드 + isOwner 필드 추가
    const allItems = [
      ...(folders || []).map((folder) => ({
        ...folder,
        type: "folder" as const,
        isOwner: folder.user_id === user.id,
      })),
      ...linksWithPin.map((link) => ({
        ...link,
        type: "link" as const,
        isOwner: link.user_id === user.id,
      })),
    ];

    // 정렬 순서: 폴더 → Pin된 링크 → 일반 링크 (각각 position → created_at 순)
    allItems.sort((a, b) => {
      // 1. 타입 우선 정렬 (폴더가 링크보다 먼저)
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1;
      }

      // 2. 링크인 경우 pin 여부 우선 정렬 (pin된 것이 먼저)
      if (a.type === "link" && b.type === "link") {
        const aLink = a as typeof a & { isPin?: boolean };
        const bLink = b as typeof b & { isPin?: boolean };

        const aPinned = aLink.isPin || false;
        const bPinned = bLink.isPin || false;

        if (aPinned !== bPinned) {
          return aPinned ? -1 : 1; // pin된 것이 먼저 오도록
        }
      }

      // 3. 같은 pin 상태(또는 폴더) 내에서 position 우선 정렬
      if (a.position !== b.position) {
        return (a.position || 999999) - (b.position || 999999);
      }

      // 4. position이 같으면 created_at 최신순
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    // 페이지네이션 적용
    const total = allItems.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedItems = allItems
      .slice(offset, offset + limit)
      .map((item) => {
        // user_id는 클라이언트로 전송하지 않음 (보안상 이유)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user_id: _, ...itemWithoutUserId } = item;
        return itemWithoutUserId;
      });

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
      message: "List items fetched successfully",
      data: response,
    } as ApiResponse);
  } catch (error) {
    console.error("List API error:", error);
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
