import { NextRequest, NextResponse } from "next/server";

import type { ApiResponse } from "@/types/api";
import type { LinkList } from "@/types/list";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

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
    const query = searchParams.get("q") || "";
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

    const [boxOwnerResult, boxShareResult] = await Promise.all([
      supabase
        .from("user_box")
        .select("id")
        .eq("id", boxId)
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("box_shares")
        .select("id")
        .eq("box_id", boxId)
        .eq("member_id", user.id)
        .maybeSingle(),
    ]);

    const hasAccess = !!boxOwnerResult.data || !!boxShareResult.data;
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

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        message: "Search ready",
        data: {
          results: [],
          totalCount: 0,
          query: "",
          filters: {
            boxId,
            parentId,
          },
          pagination: {
            page: 1,
            limit: 20,
            hasNextPage: false,
          },
        },
      } as ApiResponse);
    }

    const searchTerm = `%${query.toLowerCase()}%`;
    const results: LinkList[] = [];
    const offset = (page - 1) * limit;

    let countQuery = supabase
      .from("user_link")
      .select("*", { count: "exact", head: true })
      .eq("box_id", boxId)
      .or(`title.ilike.${searchTerm},url.ilike.${searchTerm}`);

    if (parentId) {
      countQuery = countQuery.eq("parent_id", parentId);
    }

    const { count: totalCount } = await countQuery;

    let linkQuery = supabase
      .from("user_link")
      .select("id, title, url, favicon_url, thumbnail_url, user_id")
      .eq("box_id", boxId)
      .or(`title.ilike.${searchTerm},url.ilike.${searchTerm}`);

    if (parentId) {
      linkQuery = linkQuery.eq("parent_id", parentId);
    }

    const { data: links, error: linkError } = await linkQuery
      .order("updated_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (linkError) {
      console.error("Link search error:", linkError);
    }

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

      links.forEach((link) => {
        results.push({
          id: link.id,
          url: link.url,
          title: link.title || link.url,
          thumbnail_url: link.thumbnail_url,
          favicon_url: link.favicon_url,
          isPin: pinnedLinkIds.has(link.id),
          isOwner: link.user_id === user.id,
        });
      });
    }

    const hasNextPage = totalCount ? offset + limit < totalCount : false;

    return NextResponse.json({
      success: true,
      message: "Search completed",
      data: {
        results,
        totalCount: totalCount || 0,
        query,
        filters: {
          boxId,
          parentId: parentId || null,
        },
        pagination: {
          page,
          limit,
          hasNextPage,
        },
      },
    } as ApiResponse);
  } catch (error) {
    console.error("Search API error:", error);
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