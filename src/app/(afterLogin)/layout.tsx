import classNames from "classnames/bind";

import Footer from "@/app/_components/Footer/Footer";
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
      <Footer />
    </UserProvider>
  );
}
