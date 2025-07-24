"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import PlusIcon from "@/app/_components/Icons/PlusIcon";
import Modal from "@/app/_components/Modal/Modal";
import Textarea from "@/app/_components/Textarea/Textarea";
import { useJoinBox } from "@/hooks/join/useJoinBox";

import styles from "./JoinBoxButton.module.css";

const cx = classNames.bind(styles);

export const JoinBoxButton = () => {
  const {
    isOpen,
    token,
    isPending,
    isValid,
    open,
    close,
    handleChange,
    handleJoin,
  } = useJoinBox();

  return (
    <>
      <button className={cx("join-button")} onClick={open}>
        <span className={cx("button-icon")}>
          <PlusIcon />
        </span>
        <span className={cx("button-label")}>박스 참여</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="박스 참여하기"
      >
        <div className={cx("content")}>
          <div className={cx("info")}>
            <p className={cx("text")}>
              초대 코드를 입력하여 박스에 참여하시겠습니까?
            </p>
            <p className={cx("subtext")}>
              박스 소유자가 제공한 초대 코드를 입력해주세요.
            </p>
            <Textarea
              value={token}
              onChange={handleChange}
              placeholder="초대 코드를 여기에 붙여넣으세요..."
              disabled={isPending}
              rows={3}
            />
          </div>
          
          <div className={cx("actions")}>
            <Button onClick={close} variant="secondary" disabled={isPending}>
              취소
            </Button>
            <Button
              onClick={handleJoin}
              disabled={isPending || !isValid}
              loading={isPending}
            >
              참여하기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
