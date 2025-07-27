import { Drawer } from "jtrc";

import { useMobile } from "@/hooks/etc/useMobile";
import { useAddFolder } from "@/hooks/folder/useAddFolder";

import NewFolderCard from "./NewFolderCard/NewFolderCard";
import NewFolderDrawer from "./NewFolderDrawer/NewFolderDrawer";

interface AddFolderProps {
  handleAddClose: () => void;
}

export default function AddFolder({ handleAddClose }: AddFolderProps) {
  const { isMobile } = useMobile();

  const { folderName, changeFolderName, isAddLoading, handleAddFolder } =
    useAddFolder({
      handleAddClose,
    });

  return isMobile ? (
    <Drawer onClose={handleAddClose}>
      <NewFolderDrawer
        folderName={folderName}
        changeFolderName={changeFolderName}
        isAddLoading={isAddLoading}
        handleAddFolder={handleAddFolder}
        handleAddClose={handleAddClose}
      />
    </Drawer>
  ) : (
    <NewFolderCard
      folderName={folderName}
      changeFolderName={changeFolderName}
      isAddLoading={isAddLoading}
      handleAddFolder={handleAddFolder}
      handleAddClose={handleAddClose}
    />
  );
}
