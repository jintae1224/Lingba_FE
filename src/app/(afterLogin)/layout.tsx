import classNames from "classnames/bind";

import UserProvider from "@/providers/UserProvider";

import Dock from "./_components/Dock/Dock";
import Header from "./_components/Header/Header";
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
        <main className={cx("main-content")}>{children}</main>
      </div>
      <Dock />
    </UserProvider>
  );
}
