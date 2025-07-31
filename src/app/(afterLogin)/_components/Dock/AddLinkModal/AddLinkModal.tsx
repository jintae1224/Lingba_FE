"use client";

import classNames from "classnames/bind";
import { useEffect } from "react";

import Modal from "@/app/_components/Modal/Modal";
import useAddLinkForm from "@/hooks/link/useAddLinkForm";

import AddLinkActions from "./AddLinkActions/AddLinkActions";
import AddLinkBasic from "./AddLinkBasic/AddLinkBasic";
import AddLinkExpanded from "./AddLinkExpanded/AddLinkExpanded";
import styles from "./AddLinkModal.module.css";

const cx = classNames.bind(styles);

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddLinkModal({ isOpen, onClose }: AddLinkModalProps) {
  const {
    linkUrl,
    linkName,
    linkDesc,
    onChangeLinkUrl,
    onChangeLinkName,
    onChangeLinkDesc,
    isExpanded,
    toggleExpanded,
    useAi,
    toggleUseAi,
    handlePaste,
    isValidUrl,
    resetForm,
  } = useAddLinkForm();

  const formData = {
    linkUrl,
    linkName,
    linkDesc,
    useAi,
  };

  // 모달이 닫힐 때 form 초기화
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="링크 추가">
      <div className={cx("modal-content")}>
        <div className={cx("form-section")}>
          <AddLinkBasic
            linkUrl={linkUrl}
            onChangeLinkUrl={onChangeLinkUrl}
            isExpanded={isExpanded}
            toggleExpanded={toggleExpanded}
            useAi={useAi}
            toggleUseAi={toggleUseAi}
          />

          {isExpanded && (
            <div className={cx("expanded-section")}>
              <AddLinkExpanded
                linkName={linkName}
                onChangeLinkName={onChangeLinkName}
                linkDesc={linkDesc}
                onChangeLinkDesc={onChangeLinkDesc}
              />
            </div>
          )}
        </div>

        <AddLinkActions
          formData={formData}
          isValidUrl={isValidUrl}
          onClose={onClose}
          onPaste={handlePaste}
        />
      </div>
    </Modal>
  );
}