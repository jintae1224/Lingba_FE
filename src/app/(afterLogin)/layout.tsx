import classNames from "classnames/bind";

import MobileNav from "@/app/_components/MobileNav/MobileNav";
import Header from "@/app/(afterLogin)/_components/Header/Header";
import Lnb from "@/app/(afterLogin)/_components/Lnb/Lnb";
import UserProvider from "@/providers/UserProvider";

import styles from "./layout.module.css";

const cx = classNames.bind(styles);

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Header />
      <div className={cx("layout")}>
        <Lnb />
        <main className={cx("main-content")}>{children}</main>
      </div>
      <MobileNav />
    </UserProvider>
  );
}
