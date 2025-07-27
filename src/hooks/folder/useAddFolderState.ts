import { useState } from "react";

export function useAddFolderState() {
  const [isAddOn, setIsAddOn] = useState<boolean>(false);

  const handleAddOn = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setIsAddOn(true);
  };

  const handleAddClose = () => {
    setIsAddOn(false);
  };

  return {
    isAddOn,
    handleAddOn,
    handleAddClose,
  };
}
