export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "home",
    label: "홈",
    href: "/main",
    icon: "home",
  },
  {
    id: "search",
    label: "검색",
    href: "/search",
    icon: "search",
  },
  {
    id: "settings",
    label: "설정",
    href: "/settings",
    icon: "settings",
  },
];
