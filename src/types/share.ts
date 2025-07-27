export interface BoxShare {
  id: string;
  box_id: string;
  member_id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  // 관계 데이터
  box?: {
    id: string;
    name: string;
    color?: string;
  };
  member?: {
    id: string;
    nickname: string;
    color?: string;
  };
  owner?: {
    id: string;
    nickname: string;
  };
}

export interface BoxJoin {
  id: string;
  box_id: string;
  owner_id: string;
  join_token: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  expires_at: string;
  used_by_user_id?: string;
  used_at?: string;
  created_at: string;
  updated_at: string;
  // 관계 데이터
  box?: {
    id: string;
    name: string;
    color?: string;
  };
  owner?: {
    id: string;
    nickname: string;
  };
}

export interface ActiveJoin {
  id: string;
  box_id: string;
  join_token: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  expires_at: string;
}
