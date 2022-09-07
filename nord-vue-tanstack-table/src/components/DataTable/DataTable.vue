<script setup lang="ts">
import { watchEffect, computed } from "vue";
import { FlexRender } from "@tanstack/vue-table";
import type { Table } from "@tanstack/vue-table";
import ResizeHandle from "./ResizeHandle.vue";
import SortButton from "./SortButton.vue";

const { table } = defineProps<{ table: Table<any> }>();

const ariaSortMap = {
  default: "none",
  asc: "ascending",
  desc: "descending",
} as const;

const isResizing = computed(() =>
  table.getAllFlatColumns().some((col) => col.getIsResizing())
);

watchEffect(() => {
  const userSelect = isResizing.value ? "none" : "";
  document.body.style.setProperty("user-select", userSelect);
  document.body.style.setProperty("-webkit-user-select", userSelect);
});
</script>

<template>
  <nord-table :class="{ 'is-resizing': isResizing }">
    <table>
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :aria-sort="
              header.column.getCanSort()
                ? ariaSortMap[header.column.getIsSorted() || 'default']
                : undefined
            "
            :style="{
              width: `${header.getSize()}px`,
              ...(header.column.columnDef?.meta as any)?.style,
            }"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <template v-if="!header.isPlaceholder">
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <SortButton v-if="header.column.getCanSort()" :header="header" />
              <ResizeHandle
                v-if="header.column.getCanResize()"
                :header="header"
              />
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :style="{
              width: `${cell.column.getSize()}px`,
              ...(cell.column.columnDef?.meta as any)?.style,
            }"
            :class="{
              'n-table-ellipsis': (cell.column.columnDef?.meta as any)?.truncate,
            }"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </nord-table>
</template>

<style scoped>
table {
  table-layout: fixed;
}

nord-table.is-resizing * {
  cursor: col-resize !important;
}

nord-table th[aria-sort] {
  cursor: pointer;
}

nord-table th[aria-sort]:not([aria-sort="none"]) {
  color: var(--n-color-text);
}
</style>
