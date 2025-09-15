import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import * as folderService from "@/services/folder/folder";

export function useFolderList() {
  const params = useParams();
  const boxId = params.boxId as string;

  // 폴더 목록 조회
  const {
    data: foldersResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["folders", boxId],
    queryFn: () => folderService.getFolders(boxId),
    enabled: !!boxId,
  });

  const folders = foldersResponse?.success ? foldersResponse.data : [];

  return {
    folders,
    isLoading,
    error,
    refetch,
  };
}