// 링크 타입
export interface Link {
  id: string;
  url: string;
  title?: string | null;
  description?: string | null;
  user_id: string;
  box_id: string;
  parent_id?: string | null;
  ai_summary?: string | null;
  ai_tags?: string[] | null;
  favicon_url?: string | null;
  thumbnail_url?: string | null;
  domain?: string | null;
  position?: number | null;
  is_public?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// 링크 생성 요청
export interface CreateLinkRequest {
  url: string;
  title?: string;
  description?: string;
  box_id: string;
  parent_id?: string;
  ai_summary?: string;
  ai_tags?: string[];
  favicon_url?: string;
  thumbnail_url?: string;
  position?: number;
}

// 링크 수정 요청
export interface UpdateLinkRequest {
  url?: string;
  title?: string;
  description?: string;
  parent_id?: string;
  ai_summary?: string;
  ai_tags?: string[];
  favicon_url?: string;
  thumbnail_url?: string;
  position?: number;
  is_public?: boolean;
}
