import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";

import ChevronDownIcon from "@/app/_components/Icons/ChevronDownIcon";

import styles from "./Accordion.module.css";

const cx = classNames.bind(styles);

interface AccordionProps {
  title: string;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Accordion({
  title,
  defaultExpanded = true,
  icon,
  children,
  className,
  id,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId =
    id ?? `accordion-panel-${Math.random().toString(36).slice(2, 7)}`;

  const animateOpen = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.height = "auto";
      return;
    }

    if (el.style.height === "" || el.style.height === "auto") {
      el.style.height = "0px";
    }
    el.getBoundingClientRect(); // 강제 리플로우
    el.style.height = `${el.scrollHeight}px`;

    const handleEnd = () => {
      if (isExpanded) el.style.height = "auto";
      el.removeEventListener("transitionend", handleEnd);
    };
    el.addEventListener("transitionend", handleEnd);
  }, [isExpanded]);

  const animateClose = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.height = "0px";
      return;
    }

    if (el.style.height === "" || el.style.height === "auto") {
      el.style.height = `${el.scrollHeight}px`;
    }
    el.getBoundingClientRect();
    el.style.height = "0px";
  }, []);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    el.style.willChange = "height";

    if (isExpanded) {
      animateOpen();
    } else {
      animateClose();
    }

    return () => {
      if (el) el.style.willChange = "";
    };
  }, [isExpanded, animateOpen, animateClose]);

  return (
    <div className={cx("accordion", { expanded: isExpanded }, className)}>
      <button
        className={cx("accordion-header")}
        onClick={() => setIsExpanded((p) => !p)}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        type="button"
      >
        <div className={cx("header-content")}>
          {icon && <div className={cx("icon")}>{icon}</div>}
          <h3 className={cx("title")}>{title}</h3>
        </div>
        <ChevronDownIcon className={cx("chevron", { expanded: isExpanded })} />
      </button>

      <div
        id={panelId}
        ref={panelRef}
        className={cx("accordion-panel")}
        aria-hidden={!isExpanded}
      >
        <div className={cx("accordion-content")}>{children}</div>
      </div>
    </div>
  );
}
