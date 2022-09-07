<script setup lang="ts">
import { Header } from "@tanstack/vue-table";

const { header } = defineProps<{
  header: Header<any, any>;
}>();

const sortIconMap = {
  default: "interface-sort-small",
  asc: "interface-sort-up-small",
  desc: "interface-sort-down-small",
} as const;
</script>

<template>
  <button v-if="header.column.getCanSort()" class="n-sort-btn">
    <nord-icon
      size="xs"
      color="currentColor"
      :name="sortIconMap[header.column.getIsSorted() || 'default']"
      label="Press to sort"
    ></nord-icon>
  </button>
</template>

<style scoped>
.n-sort-btn {
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
  margin-inline-start: calc(var(--n-space-s) / 2);
  margin-inline-end: calc(var(--n-space-s) / 2);
  padding: calc(var(--n-space-s) / 2);
}

:not(.is-resizing) th:hover .n-sort-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--n-color-icon-hover);
  border-radius: var(--n-border-radius-s);
  opacity: 0.05;
}

.n-sort-btn nord-icon {
  display: block;
  color: var(--n-color-icon);
}

[aria-sort]:not([aria-sort="none"]) .n-sort-btn nord-icon {
  color: var(--n-color-accent);
}
</style>
