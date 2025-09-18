import { KeyboardEvent } from "react";

export const createKeyHandler = (handlers: {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onTab?: () => void;
}) => {
  return (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        handlers.onEnter?.();
        break;
      case "Escape":
        e.preventDefault();
        handlers.onEscape?.();
        break;
      case "ArrowUp":
        e.preventDefault();
        handlers.onArrowUp?.();
        break;
      case "ArrowDown":
        e.preventDefault();
        handlers.onArrowDown?.();
        break;
      case "Tab":
        if (handlers.onTab) {
          e.preventDefault();
          handlers.onTab();
        }
        break;
    }
  };
};

export const Keys = {
  ENTER: "Enter",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  SPACE: " ",
  BACKSPACE: "Backspace",
  DELETE: "Delete",
} as const;