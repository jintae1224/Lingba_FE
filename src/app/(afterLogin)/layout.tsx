import classNames from "classnames/bind";

import Header from "@/app/_components/Header/Header";
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
      <div className={cx("container")}>{children}</div>
    </UserProvider>
  );
}
