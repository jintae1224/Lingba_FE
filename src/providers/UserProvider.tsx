"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUserStore } from "@/stores/userStore";
import { ApiResponse } from "@/types/api";
import { UserProfile } from "@/types/user";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const router = useRouter();
  const { setUser, setLoading, setError } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const response = await fetch("/conn/me");
        const data: ApiResponse<UserProfile> = await response.json();

        if (data.success) {
          // 사용자 정보 조회 성공
          setUser(data.data);
        } else {
          // 사용자 정보 없음 (회원가입 필요 또는 인증 실
          setError(data.message);
          router.push("/login");
        }
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        setError("사용자 정보를 불러올 수 없습니다.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router, setUser, setLoading, setError]);

  return <>{children}</>;
}
