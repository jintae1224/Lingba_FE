import classNames from "classnames/bind";

import Button from "@/app/_components/Button/Button";
import FolderSelector from "@/app/_components/FolderSelector/FolderSelector";
import Switch from "@/app/_components/Switch/Switch";
import Textarea from "@/app/_components/Textarea/Textarea";

import styles from "./AddLinkForm.module.css";

const cx = classNames.bind(styles);

interface AddLinkFormProps {
  url: string;
  name: string;
  description: string;
  isExpanded: boolean;
  useAiSummary: boolean;
  selectedFolderId?: string | null;
  currentBoxId?: string;
  isSubmitting?: boolean;
  setUseAiSummary: (value: boolean) => void;
  onToggleExpanded: () => void;
  onPaste: () => void;
  onUrlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFolderSelect: (folderId: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function AddLinkForm({
  url,
  name,
  description,
  isExpanded,
  useAiSummary,
  selectedFolderId,
  currentBoxId,
  isSubmitting = false,
  setUseAiSummary,
  onToggleExpanded,
  onPaste,
  onUrlChange,
  onNameChange,
  onDescriptionChange,
  onFolderSelect,
  onSubmit,
  onClose,
}: AddLinkFormProps) {
  return (
    <form onSubmit={onSubmit} className={cx("form-content")}>
      <div className={cx("header")}>
        <h3 className={cx("title")}>링크 추가</h3>
      </div>

      <div className={cx("input-group")}>
        <Textarea
          value={url}
          onChange={onUrlChange}
          placeholder="https://"
          rows={3}
          autoFocus
        />
      </div>

      <div className={cx("options-row")}>
        <div className={cx("ai-switch-container")}>
          <Switch
            checked={useAiSummary}
            onChange={setUseAiSummary}
            label="AI 요약"
            size="sm"
          />
        </div>
        <div className={cx("advanced-toggle")}>
          <button
            type="button"
            onClick={onToggleExpanded}
            className={cx("toggle-btn")}
          >
            {isExpanded ? "간단히" : "고급 옵션"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={cx("advanced-fields")}>
          <div className={cx("input-group")}>
            <label className={cx("label")}>이름 (선택)</label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="링크 이름"
              className={cx("text-input")}
            />
          </div>

          <div className={cx("input-group")}>
            <label className={cx("label")}>설명 (선택)</label>
            <Textarea
              value={description}
              onChange={onDescriptionChange}
              placeholder="링크에 대한 설명"
              rows={3}
            />
          </div>

          {currentBoxId && (
            <div className={cx("input-group")}>
              <label className={cx("label")}>폴더 위치</label>
              <div className={cx("folder-selector-container")}>
                <FolderSelector
                  boxId={currentBoxId}
                  selectedFolderId={selectedFolderId}
                  onFolderSelect={onFolderSelect}
                  showCreateButton={false}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className={cx("actions")}>
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className={cx("cancel-btn")}
          disabled={isSubmitting}
        >
          취소
        </Button>
        {url.trim() ? (
          <Button
            type="submit"
            variant="primary"
            className={cx("submit-btn")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "추가 중..." : "추가하기"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={onPaste}
            className={cx("paste-btn")}
            disabled={isSubmitting}
          >
            붙여넣기
          </Button>
        )}
      </div>
    </form>
  );
}
