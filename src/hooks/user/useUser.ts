import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "@/services/user/user";

/**
 * 사용자 정보 조회 훅
 */
export const useUser = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 유지
    gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
  });

  return {
    user: data || null,
    isLoading,
    error,
    refetch,
  };
};

