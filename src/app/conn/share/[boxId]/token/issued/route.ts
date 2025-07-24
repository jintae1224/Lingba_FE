import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { createClient } from "@/utils/supabase/server";

interface RouteParams {
  params: Promise<{
    boxId: string;
  }>;
}

// 토큰 발급 상수 설정
const DEFAULT_EXPIRY_DAYS = 1;

// 박스 토큰 발급 API
export async function POST(_: NextRequest, { params }: RouteParams) {
  const { boxId } = await params;

  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      const response: ApiResponse = {
        success: false,
        message: "인증되지 않은 사용자입니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 401 });
    }

    // 박스 소유자인지 확인 (소유자만 토큰 발급 가능)
    const { data: boxData } = await supabase
      .from("user_box")
      .select("user_id, name, color")
      .eq("id", boxId)
      .single();

    if (!boxData || boxData.user_id !== user.id) {
      const response: ApiResponse = {
        success: false,
        message: "박스 토큰을 발급할 권한이 없습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 403 });
    }

    // 기존 대기 중인 토큰이 있는지 확인
    const { data: existingToken } = await supabase
      .from("box_join")
      .select("id, join_token, expires_at")
      .eq("box_id", boxId)
      .eq("owner_id", user.id)
      .eq("status", "pending")
      .gt("expires_at", new Date().toISOString())
      .single();

    if (existingToken) {
      const response: ApiResponse = {
        success: false,
        message:
          "이미 활성화된 토큰이 있습니다. 기존 토큰을 사용하거나 만료될 때까지 기다려주세요.",
        data: null,
      };
      return NextResponse.json(response, { status: 409 });
    }

    // 토큰 생성 (32자리 랜덤 토큰)
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let joinToken = "";
    for (let i = 0; i < 32; i++) {
      joinToken += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // 만료일 계산
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + DEFAULT_EXPIRY_DAYS);

    // box_join 테이블에 토큰 데이터 저장
    const { data: tokenData, error: tokenError } = await supabase
      .from("box_join")
      .insert({
        box_id: boxId,
        owner_id: user.id,
        join_token: joinToken,
        status: "pending",
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (tokenError || !tokenData) {
      const response: ApiResponse = {
        success: false,
        message: "토큰 발급에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "토큰이 성공적으로 발급되었습니다.",
      data: null,
    };
    return NextResponse.json(response);
  } catch {
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
