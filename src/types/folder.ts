// 폴더 타입
export interface Folder {
  id: string;
  name: string;
  color?: string | null;
  user_id: string;
  box_id: string;
  parent_id?: string | null;
  position?: number | null;
  is_expanded?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// 폴더 생성 요청
export interface CreateFolderRequest {
  name: string;
  color?: string;
  box_id: string;
  parent_id?: string;
  position?: number;
}

// 폴더 수정 요청
export interface UpdateFolderRequest {
  name?: string;
  color?: string;
  position?: number;
  is_expanded?: boolean;
  parent_id?: string;
}
