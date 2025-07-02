import type { ApiResponse } from "@/types/api";
import type {
  CreateFolderRequest,
  Folder,
  UpdateFolderRequest,
} from "@/types/folder";

// 폴더 생성
export async function createFolder(
  data: CreateFolderRequest
): Promise<ApiResponse<Folder>> {
  const response = await fetch("/conn/folder/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// 폴더 목록 조회
export async function getFolders(
  boxId: string
): Promise<ApiResponse<Folder[]>> {
  const response = await fetch(`/conn/folder/list?box_id=${boxId}`, {
    method: "GET",
  });

  return response.json();
}

// 폴더 수정
export async function updateFolder(
  folderId: string,
  data: UpdateFolderRequest
): Promise<ApiResponse<Folder>> {
  const response = await fetch(`/conn/folder/${folderId}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// 폴더 삭제
export async function deleteFolder(
  folderId: string
): Promise<ApiResponse<null>> {
  const response = await fetch(`/conn/folder/${folderId}/delete`, {
    method: "DELETE",
  });

  return response.json();
}
