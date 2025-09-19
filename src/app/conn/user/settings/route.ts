import { NextRequest, NextResponse } from "next/server";

import { AGE_OPTIONS, GENDER_OPTIONS } from "@/constants/signup";
import { ApiResponse } from "@/types/api";
import { AgeGroup, Gender } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

// 사용자 설정 수정 API (gender, age_group)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 사용자 인증 확인
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

    // 요청 body 파싱
    const body = await request.json();
    const { gender, age_group } = body;

    // 업데이트할 데이터 준비
    const updateData: {
      updated_at: string;
      gender?: Gender;
      age_group?: AgeGroup;
    } = {
      updated_at: new Date().toISOString(),
    };

    // gender 유효성 검사
    if (gender !== undefined) {
      const validGenders = GENDER_OPTIONS.map(option => option.value);
      if (!validGenders.includes(gender)) {
        const response: ApiResponse = {
          success: false,
          message: "유효하지 않은 성별값입니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 400 });
      }
      updateData.gender = gender;
    }

    // age_group 유효성 검사
    if (age_group !== undefined) {
      const validAgeGroups = AGE_OPTIONS.map(option => option.value);
      if (!validAgeGroups.includes(age_group)) {
        const response: ApiResponse = {
          success: false,
          message: "유효하지 않은 연령대값입니다.",
          data: null,
        };
        return NextResponse.json(response, { status: 400 });
      }
      updateData.age_group = age_group;
    }

    // 사용자 설정 업데이트
    const { error: updateError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", user.id);

    if (updateError) {
      console.error("사용자 설정 업데이트 오류:", updateError);
      const response: ApiResponse = {
        success: false,
        message: "설정 업데이트에 실패했습니다.",
        data: null,
      };
      return NextResponse.json(response, { status: 500 });
    }

    const response: ApiResponse = {
      success: true,
      message: "설정이 성공적으로 업데이트되었습니다.",
      data: null,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("설정 업데이트 API 오류:", error);
    const response: ApiResponse = {
      success: false,
      message: "서버 오류가 발생했습니다.",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}