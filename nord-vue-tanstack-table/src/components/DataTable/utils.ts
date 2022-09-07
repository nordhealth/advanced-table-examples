import { defaultColumnSizing, Header } from '@tanstack/vue-table';

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export function updateColumnSizeBy(header: Header<any, any>, delta: number) {
  header.getContext().table.setColumnSizing((prev) => {
    const {
      maxSize = defaultColumnSizing.maxSize,
      minSize = defaultColumnSizing.minSize,
    } = header.column.columnDef;

    return {
      ...prev,
      [header.id]: clamp(header.column.getSize() + delta, minSize, maxSize),
    };
  });
}
