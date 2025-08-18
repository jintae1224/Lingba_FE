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

    // 웹사이트 정보 자동 추출
    let extractedTitle = title;
    let extractedDescription = description;
    let extractedFaviconUrl = favicon_url;
    let extractedThumbnailUrl = thumbnail_url;

    try {
      const firecrawlApiUrl = process.env.FIRECRAWL_API_URL;
      const firecrawlApiToken = process.env.FIRECRAWL_API_TOKEN;

      if (!firecrawlApiUrl || !firecrawlApiToken) {
        return NextResponse.json(
          {
            success: false,
            message: "웹사이트 분석 서비스 설정이 필요합니다.",
            data: null,
          } as ApiResponse,
          { status: 500 }
        );
      } else {
        const response = await fetch(firecrawlApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firecrawlApiToken}`,
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          return NextResponse.json(
            {
              success: false,
              message: `웹사이트 정보를 가져올 수 없습니다.`,
              data: null,
            } as ApiResponse,
            { status: 502 }
          );
        }

        const result = await response.json();
        if (!result.success || !result.data) {
          return NextResponse.json(
            {
              success: false,
              message: "웹사이트 정보 추출에 실패했습니다.",
              data: null,
            } as ApiResponse,
            { status: 502 }
          );
        }

        // 추출된 정보로 빈 필드 채우기
        extractedTitle = title || result.data.title || null;
        extractedDescription = description || result.data.description || null;
        extractedFaviconUrl =
          favicon_url || result.data.metadata?.favicon || null;
        extractedThumbnailUrl =
          thumbnail_url ||
          result.data.metadata?.ogImage ||
          result.data.metadata?.["og:image"] ||
          null;
      }
    } catch (error) {
      console.error("웹사이트 정보 추출 중 오류:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "웹사이트 정보를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          data: null,
        } as ApiResponse,
        { status: 500 }
      );
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
