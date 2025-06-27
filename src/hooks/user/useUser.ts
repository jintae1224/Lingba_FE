import { useUserStore } from "@/stores/userStore";

export const useUser = () => {
  const { user, isLoading, error } = useUserStore();

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
};
