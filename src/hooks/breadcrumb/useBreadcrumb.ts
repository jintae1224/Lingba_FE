import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { getBreadcrumb } from "@/services/breadcrumb/breadcrumb";
import type { BreadcrumbItem } from "@/types/breadcrumb";

interface NavItem extends BreadcrumbItem {
  isLastItem: boolean;
  isEllipsis?: boolean;
}

interface Navigation {
  displayItems: NavItem[];
  hasTruncation: boolean;
}

const MAX_VISIBLE_ITEMS = 4;

export function useBreadcrumb() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const boxId = params.boxId as string;
  const folderId = searchParams.get("f_id") || null;
  const { data: breadcrumbItems = [] } = useQuery({
    queryKey: ["breadcrumb", boxId, folderId],
    queryFn: async () => {
      const result = await getBreadcrumb(boxId, folderId);
      if (!result.success) {
        throw new Error(result.message || "브레드크럼 데이터를 불러오는데 실패했습니다");
      }
      return result.data || [];
    },
    enabled: !!boxId,
  });

  const navigateToItem = (targetFolderId?: string) => {
    const path = targetFolderId 
      ? `/search/${boxId}?f_id=${targetFolderId}`
      : `/search/${boxId}`;
    router.push(path);
  };

  // navigation 아이템들을 생성 (최대 표시 개수 적용)
  const navigation: Navigation = (() => {
    const totalItems = breadcrumbItems.length;
    
    // 최대 표시 개수보다 적거나 같으면 모든 아이템 표시
    if (totalItems <= MAX_VISIBLE_ITEMS) {
      return {
        displayItems: breadcrumbItems.map((item, index) => ({
          ...item,
          isLastItem: index === totalItems - 1,
        })),
        hasTruncation: false,
      };
    }

    // 생략 표시가 필요한 경우
    const EDGE_ITEMS_COUNT = 2; // 앞뒤로 보여줄 아이템 개수
    const startItems = breadcrumbItems.slice(0, EDGE_ITEMS_COUNT);
    const endItems = breadcrumbItems.slice(-EDGE_ITEMS_COUNT);

    const truncationItem: NavItem = {
      id: "breadcrumb-ellipsis",
      name: "...",
      parent_id: null,
      isLastItem: false,
      isEllipsis: true,
    };

    const displayItems: NavItem[] = [
      ...startItems.map((item) => ({
        ...item,
        isLastItem: false,
      })),
      truncationItem,
      ...endItems.map((item, index) => ({
        ...item,
        isLastItem: index === endItems.length - 1,
      })),
    ];

    return {
      displayItems,
      hasTruncation: true,
    };
  })();

  return {
    navigation,
    navigateToItem,
  };
}
