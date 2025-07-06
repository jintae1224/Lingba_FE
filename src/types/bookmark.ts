import type { Folder } from "./folder";
import type { Link } from "./link";

export type BookmarkItem = 
  | ({ type: "folder" } & Folder)
  | ({ type: "link" } & Link);

export interface BookmarkListResponse {
  items: BookmarkItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}