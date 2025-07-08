import { createClient as createServiceClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { Box } from "@/types/box";
import { createClient } from "@/utils/supabase/server";

// 사용자의 박스 목록 조회 API
export async function GET() {
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

    // 1. 내 박스들 조회
    const { data: ownBoxes, error: ownBoxesError } = await supabase
      .from("user_box")
      .select(
        "id, name, color, position, is_default, user_id, created_at, updated_at"
      )
      .eq("user_id", user.id)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (ownBoxesError) {
      const response: ApiResponse = {
        success: false,
        message: "박스 목록 조회 중 오류가 발생했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    // 2. 공유받은 박스들 조회 (서비스 역할 클라이언트 사용)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let sharedBoxes: Box[] = [];

    if (supabaseUrl && supabaseServiceKey) {
      const serviceClient = createServiceClient(
        supabaseUrl,
        supabaseServiceKey
      );

      // 먼저 공유 정보 조회
      const { data: shareData, error: shareError } = await serviceClient
        .from("box_shares")
        .select("box_id, owner_id")
        .eq("member_id", user.id);

      if (!shareError && shareData && shareData.length > 0) {
        // 각 공유받은 박스 ID로 실제 박스 데이터 조회
        const boxIds = shareData.map((share) => share.box_id);

        const { data: boxesData, error: boxesError } = await serviceClient
          .from("user_box")
          .select(
            "id, name, color, position, is_default, user_id, created_at, updated_at"
          )
          .in("id", boxIds);

        if (!boxesError && boxesData) {
          // 공유 정보와 박스 데이터 매핑
          sharedBoxes = boxesData.map((box): Box => {
            return {
              id: box.id,
              name: box.name,
              color: box.color,
              position: box.position,
              is_default: box.is_default,
              user_id: box.user_id,
              created_at: box.created_at,
              updated_at: box.updated_at,
              is_shared: true,
            };
          });
        }
      }
    }

    // 3. 데이터 병합
    const allBoxes: Box[] = [];

    // 내 박스들 추가
    if (ownBoxes) {
      allBoxes.push(
        ...(ownBoxes as Box[]).map(
          (box): Box => ({
            ...box,
            is_shared: false,
          })
        )
      );
    }

    // 공유받은 박스들 추가
    allBoxes.push(...sharedBoxes);

    // 내 박스가 없는 경우 기본 박스 자동 생성
    if (!ownBoxes || ownBoxes.length === 0) {
      const { data: newBox, error: createError } = await supabase
        .from("user_box")
        .insert({
          name: "나의 첫 번째 박스",
          color: "#3b82f6",
          user_id: user.id,
          position: 1,
          is_default: true,
        })
        .select(
          "id, name, color, position, is_default, user_id, created_at, updated_at"
        )
        .single();

      if (!createError && newBox) {
        // 새로 생성한 박스를 목록에 추가
        allBoxes.unshift({ ...(newBox as Box), is_shared: false });
      }
    }

    const response: ApiResponse<Box[]> = {
      success: true,
      message: "박스 목록 조회 성공",
      data: allBoxes,
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
