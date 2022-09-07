<script setup lang="ts">
import { ref } from "vue";
import { IHeaderParams } from "ag-grid-community";
import { useEventListener } from "../../utils/events.js";
import SortButton from "./SortButton.vue";

const { params } = defineProps<{ params: IHeaderParams }>();

const textAlign: "end" | undefined =
  params.column.getColDef().type === "rightAligned" ? "end" : undefined;

const sortOrderMap = {
  default: "asc",
  asc: "desc",
  desc: null,
} as const;

const sort = ref(params.column.getSort());
useEventListener(params.column, "sortChanged", () => {
  sort.value = params.column.getSort();
});

const updateSort = (event: MouseEvent) => {
  if (params.enableSorting) {
    const newSort = sortOrderMap[sort.value ?? "default"];
    params.setSort(newSort, event.shiftKey);
  }
};
</script>

<template>
  <div :style="{ textAlign }" @click="updateSort">
    {{ params.displayName }}
    <SortButton v-if="params.enableSorting" :sort="sort" />
  </div>
</template>
