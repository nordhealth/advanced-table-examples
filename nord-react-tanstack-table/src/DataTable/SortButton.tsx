import { Icon } from "@nordhealth/react";
import { Header } from "@tanstack/react-table";
import "./SortButton.css";

const sortIconMap = {
  default: "interface-sort-small",
  asc: "interface-sort-up-small",
  desc: "interface-sort-down-small",
} as const;

export function SortButton<TData, TValue>({
  header,
}: {
  header: Header<TData, TValue>;
}) {
  return (
    <button className="n-sort-btn">
      <Icon
        size="xs"
        color="currentColor"
        name={sortIconMap[header.column.getIsSorted() || "default"]}
        label="Press to sort"
      ></Icon>
    </button>
  );
}
