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

    const {
      url,
      title,
      description,
      box_id,
      parent_id,
      ai_summary,
      ai_tags,
      favicon_url,
      thumbnail_url,
      position,
    } = await request.json();

    // 필수 필드 검증
    if (!url || !box_id) {
      return NextResponse.json(
        {
          success: false,
          message: "URL and box_id are required",
          data: null,
        } as ApiResponse,
        { status: 400 }
      );
    }

    // domain 추출
    let domain = null;
    try {
      const urlObj = new URL(url);
      domain = urlObj.hostname;
    } catch {
      // URL 파싱 실패 시 domain은 null로 유지
    }

    // 웹사이트 정보 자동 추출 (title이나 description이 없는 경우에만)
    let extractedTitle = title;
    let extractedDescription = description;
    let extractedFaviconUrl = favicon_url;
    let extractedThumbnailUrl = thumbnail_url;

    if (!title || !description || !favicon_url || !thumbnail_url) {
      try {
        const firecrawlApiUrl = process.env.FIRECRAWL_API_URL;
        const firecrawlApiToken = process.env.FIRECRAWL_API_TOKEN;

        if (firecrawlApiUrl && firecrawlApiToken) {
          const response = await fetch(firecrawlApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${firecrawlApiToken}`,
            },
            body: JSON.stringify({ url }),
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              // 추출된 정보로 빈 필드 채우기
              extractedTitle = title || result.data.title || null;
              extractedDescription =
                description || result.data.description || null;
              extractedFaviconUrl =
                favicon_url || result.data.metadata?.favicon || null;
              extractedThumbnailUrl =
                thumbnail_url ||
                result.data.metadata?.ogImage ||
                result.data.metadata?.["og:image"] ||
                null;
            }
          } else {
            console.warn(
              "Firecrawl API 호출 실패:",
              response.status,
              response.statusText
            );
          }
        }
      } catch (error) {
        console.warn("웹사이트 정보 추출 중 오류:", error);
        // 오류가 발생해도 링크 생성은 계속 진행
      }
    }

    // 링크 생성
    const { data: link, error } = await supabase
      .from("user_link")
      .insert({
        url,
        title: extractedTitle,
        description: extractedDescription,
        user_id: user.id,
        box_id,
        parent_id,
        ai_summary,
        ai_tags,
        favicon_url: extractedFaviconUrl,
        thumbnail_url: extractedThumbnailUrl,
        domain,
        position: position || 0,
        is_public: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Link creation error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create link",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Link created successfully",
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
