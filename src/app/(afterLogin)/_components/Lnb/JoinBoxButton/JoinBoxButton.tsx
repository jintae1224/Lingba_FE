"use client";

import { useState } from "react";

import Button from "@/app/_components/Button/Button";
import PlusIcon from "@/app/_components/Icons/PlusIcon";
import Modal from "@/app/_components/Modal/Modal";
import Textarea from "@/app/_components/Textarea/Textarea";
import { useBoxJoin } from "@/hooks/join/useBoxJoin";

import styles from "./JoinBoxButton.module.css";

export const JoinBoxButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinToken, setJoinToken] = useState("");
  const { mutate: joinBox, isPending } = useBoxJoin();

  const handleJoinClick = () => {
    if (joinToken.trim()) {
      joinBox(joinToken.trim(), {
        onSuccess: (data) => {
          if (data.success) {
            setIsModalOpen(false);
            setJoinToken("");
          }
        },
      });
    }
  };

  return (
    <>
      <button
        className={styles.joinButton}
        onClick={() => setIsModalOpen(true)}
      >
        <span className={styles.buttonIcon}>
          <PlusIcon />
        </span>
        <span className={styles.buttonLabel}>박스 참여</span>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="초대 코드로 박스 참여"
      >
        <div className={styles.modalContent}>
          <Textarea
            value={joinToken}
            onChange={(e) => setJoinToken(e.target.value)}
            placeholder="초대 코드를 입력하세요."
            disabled={isPending}
          />
          <Button
            onClick={handleJoinClick}
            disabled={isPending || !joinToken.trim()}
          >
            {isPending ? "참여 중..." : "참여하기"}
          </Button>
        </div>
      </Modal>
    </>
  );
};
