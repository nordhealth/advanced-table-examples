import { IHeaderParams } from "ag-grid-community";
import { SortButton } from "./SortButton.js";

const sortOrderMap = {
  default: "asc",
  asc: "desc",
  desc: null,
} as const;

export function CustomHeader({
  enableSorting,
  column,
  setSort,
  displayName,
}: IHeaderParams) {
  const textAlign =
    column.getColDef().type === "rightAligned" ? "end" : undefined;

  return (
    <div
      style={{ textAlign }}
      onClick={(event) => {
        if (enableSorting) {
          const order = sortOrderMap[column.getSort() || "default"];
          setSort(order, event.shiftKey);
        }
      }}
    >
      {displayName}
      {enableSorting && <SortButton sort={column.getSort()} />}
    </div>
  );
}
