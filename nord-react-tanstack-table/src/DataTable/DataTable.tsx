import { useEffect } from "react";
import { Table } from "@nordhealth/react";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";

import "./DataTable.css";
import { ResizeHandle } from "./ResizeHandle.js";
import { SortButton } from "./SortButton.js";

const ariaSortMap = {
  default: "none",
  asc: "ascending",
  desc: "descending",
} as const;

function usePreventSelection(prevent: boolean) {
  useEffect(() => {
    const userSelect = prevent ? "none" : "";
    document.body.style.setProperty("user-select", userSelect);
    document.body.style.setProperty("-webkit-user-select", userSelect);
  }, [prevent]);
}

export function DataTable<TData>({ table }: { table: TanstackTable<TData> }) {
  const isResizing = table
    .getAllFlatColumns()
    .some((col) => col.getIsResizing());

  usePreventSelection(isResizing);

  return (
    <Table className={isResizing ? "is-resizing" : ""}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.isPlaceholder) {
                  return <th key={header.id}></th>;
                }

                return (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      ...(header.column.columnDef?.meta as any)?.style,
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                    aria-sort={
                      header.column.getCanSort()
                        ? ariaSortMap[header.column.getIsSorted() || "default"]
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <SortButton header={header} />
                    )}
                    {header.column.getCanResize() && (
                      <ResizeHandle header={header} />
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={
                    (cell.column.columnDef?.meta as any)?.truncate
                      ? "n-table-ellipsis"
                      : ""
                  }
                  style={{
                    width: cell.column.getSize(),
                    ...(cell.column.columnDef?.meta as any)?.style,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
}
