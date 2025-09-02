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
  is_public?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
  isPin?: boolean;
  isOwner?: boolean;
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
  is_public?: boolean;
}

// 링크 pin 요청
export interface TogglePinRequest {
  linkId: string;
  boxId: string;
  currentPinState: boolean;
}

// 링크 pin response
export interface TogglePinResponse {
  isPin: boolean;
}
