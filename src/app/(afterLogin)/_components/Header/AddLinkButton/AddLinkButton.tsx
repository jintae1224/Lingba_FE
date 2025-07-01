"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import PlusIcon from "@/app/_components/Icons/PlusIcon";
import { useMobile } from "@/hooks/etc/useMobile";
import { useAddLinkForm } from "@/hooks/header/useAddLinkForm";

import styles from "./AddLinkButton.module.css";
import AddLinkForm from "./AddLinkForm/AddLinkForm";

const cx = classNames.bind(styles);

export default function AddLinkButton() {
  const isMobile = useMobile();
  const {
    isOpen,
    url,
    name,
    description,
    isExpanded,
    useAiSummary,
    selectedFolderId,
    isSubmitting,
    currentBox,
    setUseAiSummary,
    containerRef,
    handleToggle,
    handleClose,
    handleToggleExpanded,
    handlePaste,
    handleUrlChange,
    handleNameChange,
    handleDescriptionChange,
    handleSubmit,
    handleFolderSelect,
  } = useAddLinkForm();

  // 모바일에서는 아예 렌더링하지 않음
  if (isMobile) {
    return null;
  }

  return (
    <div className={cx("container")} ref={containerRef}>
      <Button
        onClick={handleToggle}
        variant="primary"
        className={cx("add-button")}
      >
        <span className={cx("button-text")}>
          <PlusIcon />
          추가
        </span>
      </Button>

      {isOpen && (
        <>
          <div className={cx("backdrop")} />
          <div className={cx("dropdown")}>
            <div className={cx("dropdown-content")}>
              <AddLinkForm
                url={url}
                name={name}
                description={description}
                isExpanded={isExpanded}
                useAiSummary={useAiSummary}
                selectedFolderId={selectedFolderId}
                currentBoxId={currentBox?.id}
                isSubmitting={isSubmitting}
                setUseAiSummary={setUseAiSummary}
                onToggleExpanded={handleToggleExpanded}
                onPaste={handlePaste}
                onUrlChange={handleUrlChange}
                onNameChange={handleNameChange}
                onDescriptionChange={handleDescriptionChange}
                onFolderSelect={handleFolderSelect}
                onSubmit={handleSubmit}
                onClose={handleClose}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
