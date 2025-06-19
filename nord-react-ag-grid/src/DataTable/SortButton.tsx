import "./SortButton.css";
import { Column } from "ag-grid-community";

const sortIconMap = {
  default: "interface-sort-small",
  asc: "interface-sort-up-small",
  desc: "interface-sort-down-small",
} as const;

export function SortButton({ sort }: { sort: ReturnType<Column["getSort"]> }) {
  return (
    <button className="sort-btn">
      <nord-icon
        size="xs"
        color="currentColor"
        name={sortIconMap[sort || "default"]}
        label="Press to sort"
      ></nord-icon>
    </button>
  );
}
