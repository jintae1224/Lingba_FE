import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  // 현재 요청의 호스트와 프로토콜을 가져옵니다.
  const forwardedHost =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const origin = `${protocol}://${forwardedHost}`;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}`);
  }

  const { data, error } = await supabase.from("user").select("*");

  if (error) {
    return NextResponse.redirect(`${origin}/error`);
  }

  if (data?.length > 0) {
    return NextResponse.redirect(`${origin}`);
  }

  return NextResponse.redirect(`${origin}/signup`);
}
