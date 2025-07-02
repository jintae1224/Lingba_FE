// 브레드크럼 아이템
export interface BreadcrumbItem {
  id: string;
  name: string;
  parent_id: string | null;
}