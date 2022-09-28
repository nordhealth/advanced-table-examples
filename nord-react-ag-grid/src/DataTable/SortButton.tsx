import "./SortButton.css";
import { Icon } from "@nordhealth/react";
import { Column } from "ag-grid-community";

const sortIconMap = {
  default: "interface-sort-small",
  asc: "interface-sort-up-small",
  desc: "interface-sort-down-small",
} as const;

export function SortButton({ sort }: { sort: ReturnType<Column["getSort"]> }) {
  return (
    <button className="sort-btn">
      <Icon
        size="xs"
        color="currentColor"
        name={sortIconMap[sort || "default"]}
        label="Press to sort"
      ></Icon>
    </button>
  );
}
