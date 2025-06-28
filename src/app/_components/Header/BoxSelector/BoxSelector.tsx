import classNames from "classnames/bind";

import BoxList from "@/app/_components/Header/BoxList/BoxList";
import ChevronDownIcon from "@/app/_components/Icons/ChevronDownIcon";
import Modal from "@/app/_components/Modal/Modal";
import { useCurrentBox } from "@/hooks/boxes/useCurrentBox";
import { useBoxSelector } from "@/hooks/header/useBoxSelector";

import styles from "./BoxSelector.module.css";

const cx = classNames.bind(styles);

export default function BoxSelector() {
  const { currentBox, otherBoxes, boxesLoading, error, handleBoxSelect } =
    useCurrentBox();

  const {
    boxSelectorRef,
    isDropdownOpen,
    isModalOpen,
    isMobile,
    toggleDropdown,
    closeDropdown,
    closeModal,
  } = useBoxSelector();

  return (
    <>
      <div className={cx("box-selector")} ref={boxSelectorRef}>
        <button className={cx("current-box")} onClick={toggleDropdown}>
          <div className={cx("box-info")}>
            {error ? (
              <span className={cx("box-name", "error")}>-</span>
            ) : !boxesLoading && currentBox ? (
              <>
                <div
                  className={cx("box-color")}
                  style={{ backgroundColor: currentBox.color || "#3b82f6" }}
                />
                <span className={cx("box-name")}>{currentBox.name}</span>
              </>
            ) : (
              <span className={cx("box-name", "no-box")}>로딩 중...</span>
            )}
          </div>
          <ChevronDownIcon className={cx("chevron")} />
        </button>

        {/* 데스크톱 드롭다운 */}
        {!isMobile && isDropdownOpen && (
          <div className={cx("dropdown")}>
            <div className={cx("dropdown-content")}>
              <BoxList
                currentBox={currentBox}
                otherBoxes={otherBoxes}
                onBoxSelect={handleBoxSelect}
                variant="dropdown"
              />
            </div>
          </div>
        )}
      </div>

      {/* 데스크톱 백드롭 */}
      {!isMobile && isDropdownOpen && (
        <div className={cx("backdrop")} onClick={closeDropdown} />
      )}

      {/* 모바일 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="박스 선택">
        <BoxList
          currentBox={currentBox}
          otherBoxes={otherBoxes}
          onBoxSelect={handleBoxSelect}
          variant="modal"
        />
      </Modal>
    </>
  );
}
