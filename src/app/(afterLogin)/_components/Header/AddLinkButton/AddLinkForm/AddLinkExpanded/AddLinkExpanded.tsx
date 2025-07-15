import classNames from "classnames/bind";

import Input from "@/app/_components/Input/Input";
import Textarea from "@/app/_components/Textarea/Textarea";

import style from "./AddLinkExpanded.module.css";

const cx = classNames.bind(style);

interface AddLinkExpandedProps {
  linkName: string;
  onChangeLinkName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  linkDesc: string;
  onChangeLinkDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AddLinkExpanded({
  linkName,
  onChangeLinkName,
  linkDesc,
  onChangeLinkDesc,
}: AddLinkExpandedProps) {
  return (
    <>
      <div className={cx("expanded")}>
        <div className={cx("input-group")}>
          <label className={cx("label")}>이름 (선택)</label>
          <Input
            type="text"
            value={linkName}
            onChange={onChangeLinkName}
            placeholder="링크 이름"
            className={cx("text-input")}
          />
        </div>

        <div className={cx("input-group")}>
          <label className={cx("label")}>설명 (선택)</label>
          <Textarea
            value={linkDesc}
            onChange={onChangeLinkDesc}
            placeholder="링크에 대한 설명"
            rows={3}
          />
        </div>
      </div>
    </>
  );
}
