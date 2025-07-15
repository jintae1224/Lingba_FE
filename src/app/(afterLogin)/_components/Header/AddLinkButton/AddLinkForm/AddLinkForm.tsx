import classNames from "classnames/bind";

import useAddLinkForm from "@/hooks/link/useAddLinkForm";

import AddLinkActions from "./AddLinkActions/AddLinkActions";
import AddLinkBasic from "./AddLinkBasic/AddLinkBasic";
import AddLinkExpanded from "./AddLinkExpanded/AddLinkExpanded";
import styles from "./AddLinkForm.module.css";

const cx = classNames.bind(styles);

interface AddLinkFormProps {
  onClose: () => void;
}

export default function AddLinkForm({ onClose }: AddLinkFormProps) {
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
  } = useAddLinkForm();

  const formData = {
    linkUrl,
    linkName,
    linkDesc,
    useAi,
  };

  return (
    <div className={cx("form-content")}>
      <h3 className={cx("title")}>링크 추가</h3>

      <AddLinkBasic
        linkUrl={linkUrl}
        onChangeLinkUrl={onChangeLinkUrl}
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
        useAi={useAi}
        toggleUseAi={toggleUseAi}
      />

      {isExpanded && (
        <AddLinkExpanded
          linkName={linkName}
          onChangeLinkName={onChangeLinkName}
          linkDesc={linkDesc}
          onChangeLinkDesc={onChangeLinkDesc}
        />
      )}

      <AddLinkActions
        formData={formData}
        isValidUrl={isValidUrl}
        onClose={onClose}
        onPaste={handlePaste}
      />
    </div>
  );
}
