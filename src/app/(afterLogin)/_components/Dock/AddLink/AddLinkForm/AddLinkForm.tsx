"use client";

import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import Input from "@/app/_components/Input/Input";
import Switch from "@/app/_components/Switch/Switch";
import Textarea from "@/app/_components/Textarea/Textarea";
import { useDockForm } from "@/hooks/dock/useDockForm";

import styles from "./AddLinkForm.module.css";

const cx = classNames.bind(styles);

interface AddLinkFormProps {
  onClose: () => void;
}

export default function AddLinkForm({ onClose }: AddLinkFormProps) {
  return (
    <form
      // onSubmit={(e) => handleSubmit(e, onClose)}
      className={cx("dock-form")}
    >
      <div className={cx("form-content")}>
        <div className={cx("url-section")}>
          <Textarea
            value={""}
            onChange={() => {}}
            placeholder="링크를 입력하세요..."
            autoFocus
            rows={4}
          />
          <div className={cx("options")}>
            <Switch checked={false} onChange={() => {}} label="✨ AI" />
            <Button variant="default" size="small" onClick={() => {}}>
              {/* {isExpanded ? "간단히" : "자세히"} */}
              간단히
            </Button>
          </div>
        </div>
        {/* 확장 필드들 */}
        {/* {isExpanded && (
          <div className={cx("expanded-section")}>
            <Input
              type="text"
              value={linkName}
              onChange={onChangeLinkName}
              placeholder="링크 이름 (선택)"
              variant="default"
            />
            <Textarea
              value={linkDesc}
              onChange={onChangeLinkDesc}
              placeholder="링크 설명 (선택)"
              rows={2}
            />
          </div>
        )}

        <div className={cx("action-section")}>
          <Button
            type="submit"
            size="small"
            disabled={!isValidUrl || isSubmitting || isSuccess}
            loading={isSubmitting}
            selected={isSuccess}
            aria-label="링크 추가"
          >
            추가
          </Button>
          <Button
            type="button"
            onClick={() => handleClose(onClose)}
            variant="secondary"
            size="small"
            aria-label="취소"
          >
            취소
          </Button>
        </div> */}
      </div>
    </form>
  );
}
