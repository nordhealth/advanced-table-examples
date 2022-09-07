import "./ResizeHandle.css";
import { Header } from "@tanstack/react-table";
import { KeyboardEventHandler } from "react";
import { updateColumnWidth } from "./utils.js";

export function ResizeHandle({ header }: { header: Header<any, any> }) {
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        updateColumnWidth(header, -10);
        break;
      case "ArrowRight":
        updateColumnWidth(header, 10);
        break;
      case "Escape":
        header.column.resetSize();
        break;
      default:
        return;
    }

    e.preventDefault();
  };

  return (
    <div
      className={`n-resize-handle ${
        header.column.getIsResizing() ? "is-resizing" : ""
      }`}
      role="separator"
      tabIndex={0}
      aria-label="Use arrow keys to resize"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
      onMouseDown={header.getResizeHandler()}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={header.column.resetSize}
    >
      <div className="n-resize-handle-inner" />
    </div>
  );
}
