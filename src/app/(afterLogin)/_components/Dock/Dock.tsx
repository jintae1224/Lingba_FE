"use client";

import classNames from "classnames/bind";

import { useAddLinkModal } from "@/hooks/dock/useAddLinkModal";
import { useDock } from "@/hooks/dock/useDock";

import AddLinkButton from "./AddLink/AddLinkButton/AddLinkButton";
import AddLinkForm from "./AddLink/AddLinkForm/AddLinkForm";
import styles from "./Dock.module.css";
import DockItem from "./DockItem/DockItem";

const cx = classNames.bind(styles);

export default function Dock() {
  const { dockItems } = useDock();
  const {
    isOpen: isFormMode,
    open: openFormMode,
    close: closeFormMode,
  } = useAddLinkModal();

  return (
    <div className={cx("dock-wrapper")}>
      <nav
        className={cx("dock", { "form-mode": isFormMode })}
        role="navigation"
        aria-label="주요 네비게이션"
      >
        {!isFormMode && (
          <div className={cx("dock-container")}>
            <div className={cx("nav-section")}>
              {dockItems.map((item) => (
                <DockItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  isActive={item.isActive}
                />
              ))}
            </div>

            <div className={cx("separator")} />

            <div className={cx("action-section")}>
              <AddLinkButton onClick={openFormMode} />
            </div>
          </div>
        )}

        {isFormMode && <AddLinkForm onClose={closeFormMode} />}
      </nav>
    </div>
  );
}
