export interface Box {
  id: string;
  name: string;
  color?: string | null;
  position?: number | null;
  is_default?: boolean | null;
  user_id: string;
  created_at?: string | null;
  updated_at?: string | null;
  is_shared?: boolean;
}
