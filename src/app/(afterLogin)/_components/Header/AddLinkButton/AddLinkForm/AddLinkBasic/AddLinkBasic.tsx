import classNames from "classnames/bind";

import Switch from "@/app/_components/Switch/Switch";
import Textarea from "@/app/_components/Textarea/Textarea";

import style from "./AddLinkBasic.module.css";

const cx = classNames.bind(style);

interface AddLinkBasicProps {
  linkUrl: string;
  onChangeLinkUrl: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isExpanded: boolean;
  toggleExpanded: () => void;
  useAi: boolean;
  toggleUseAi: () => void;
}

export default function AddLinkBasic({
  linkUrl,
  onChangeLinkUrl,
  isExpanded,
  toggleExpanded,
  useAi,
  toggleUseAi,
}: AddLinkBasicProps) {
  return (
    <div className={cx("basic")}>
      <Textarea
        value={linkUrl}
        onChange={onChangeLinkUrl}
        placeholder="https://"
        rows={3}
        autoFocus
      />
      <div className={cx("options")}>
        <Switch
          checked={useAi}
          onChange={toggleUseAi}
          label="AI 요약"
          size="sm"
        />
        <button
          type="button"
          onClick={toggleExpanded}
          className={cx("expanded-btn")}
        >
          {isExpanded ? "간단히" : "고급 옵션"}
        </button>
      </div>
    </div>
  );
}
