"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Switch from "@/app/_components/Switch/Switch";
import { usePromptLinkAddState } from "@/hooks/link/usePromptLinkAddState";

import styles from "./AddLinkPrompt.module.css";

const cx = classNames.bind(styles);

interface AddLinkPromptProps {
  boxId: string;
}

export default function AddLinkPrompt({ boxId: _boxId }: AddLinkPromptProps) {
  const {
    url,
    isAIEnabled,
    titleLine1,
    titleLine2,
    subtitle,
    placeholder,
    toggleLabel,
    setUrl,
    toggleAI,
    buttonText,
    handleButtonClick,
  } = usePromptLinkAddState();

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("title-section")}>
          <h1 className={cx("title")}>
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
          <p className={cx("subtitle")}>{subtitle}</p>
        </div>
      </div>

      <div className={cx("input-section")}>
        <div className={cx("url-input-container")}>
          <textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className={cx("url-input")}
            rows={1}
          />
          <div className={cx("input-actions")}>
            <div className={cx("ai-toggle-section")}>
              <Switch
                checked={isAIEnabled}
                onChange={toggleAI}
                label={toggleLabel}
                size="sm"
              />
            </div>
            <Button onClick={handleButtonClick} className={cx("analyze-btn")}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
