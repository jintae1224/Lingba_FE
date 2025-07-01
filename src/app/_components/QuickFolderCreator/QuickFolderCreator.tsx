"use client";

import classNames from "classnames/bind";
import { useState } from "react";

import Modal from "@/app/_components/Modal/Modal";
import { useFolder } from "@/hooks/folder/useFolder";

import styles from "./QuickFolderCreator.module.css";

const cx = classNames.bind(styles);

interface QuickFolderCreatorProps {
  boxId: string;
  isOpen: boolean;
  onClose: () => void;
  initialParentId?: string | null;
}

export default function QuickFolderCreator({
  boxId,
  isOpen,
  onClose,
  initialParentId = null,
}: QuickFolderCreatorProps) {
  const [folderName, setFolderName] = useState("");
  const [selectedParentId, setSelectedParentId] = useState<string | null>(
    initialParentId
  );
  const [isCreating, setIsCreating] = useState(false);

  const { createFolder } = useFolder(boxId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) return;

    setIsCreating(true);
    try {
      await createFolder({
        name: folderName.trim(),
        box_id: boxId,
        parent_id: selectedParentId || undefined,
      });

      // 성공 시 초기화하고 모달 닫기
      setFolderName("");
      setSelectedParentId(initialParentId);
      onClose();
    } catch (error) {
      console.error("Failed to create folder:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setFolderName("");
    setSelectedParentId(initialParentId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="새 폴더 만들기">
      <form onSubmit={handleSubmit} className={cx("form")}>
        <div className={cx("field")}>
          <label htmlFor="folderName" className={cx("label")}>
            폴더 이름
          </label>
          <input
            id="folderName"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className={cx("input")}
            disabled={isCreating}
            autoFocus
          />
        </div>
      </form>
    </Modal>
  );
}
