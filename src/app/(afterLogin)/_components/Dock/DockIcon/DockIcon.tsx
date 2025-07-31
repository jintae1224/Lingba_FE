import HomeIcon from "@/app/_components/Icons/HomeIcon";
import SearchIcon from "@/app/_components/Icons/SearchIcon";
import SettingsIcon from "@/app/_components/Icons/SettingsIcon";
import ShareIcon from "@/app/_components/Icons/ShareIcon";

interface DockIconProps {
  iconName: string;
}

export default function DockIcon({ iconName }: DockIconProps) {
  switch (iconName) {
    case "home":
      return <HomeIcon />;
    case "search":
      return <SearchIcon />;
    case "share":
      return <ShareIcon />;
    case "settings":
      return <SettingsIcon />;
    default:
      return null;
  }
}