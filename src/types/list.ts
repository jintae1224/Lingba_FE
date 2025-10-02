import type { Folder } from "./folder";
import type { Link } from "./link";

// Parent 폴더 정보
export interface ParentFolder {
  id: string;
  name: string;
}

// 리스트에서 표시되는 폴더 정보 (기존 Folder 타입에서 필요한 필드만 추출)
export type FolderList = Pick<Folder, 'id' | 'name' | 'updated_at'> & {
  isOwner: boolean; // 현재 사용자가 만든 폴더인지 구분
  parent?: ParentFolder | null;
};

// 리스트에서 표시되는 링크 정보 (기존 Link 타입에서 필요한 필드만 추출)
export type LinkList = Pick<Link, 'id' | 'url' | 'title' | 'thumbnail_url' | 'favicon_url'> & {
  isPin: boolean;
  isOwner: boolean; // 현재 사용자가 만든 링크인지 구분
  parent?: ParentFolder | null;
};

// 리스트 아이템 Union 타입
export type ListItem = 
  | ({ type: "folder" } & FolderList)
  | ({ type: "link" } & LinkList);

// 리스트 응답 타입
export interface ListResponse {
  items: ListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}