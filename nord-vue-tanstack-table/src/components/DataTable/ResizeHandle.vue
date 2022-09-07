<script setup lang="ts">
import { Header } from "@tanstack/vue-table";
import { updateColumnSizeBy } from "./utils.js";

const { header } = defineProps<{
  header: Header<any, any>;
}>();
</script>

<template>
  <div
    v-if="header.column.getCanResize()"
    :class="{
      'n-resize-handle': true,
      'is-resizing': header.column.getIsResizing(),
    }"
    role="separator"
    tabIndex="0"
    aria-label="Use arrow keys to resize"
    aria-orientation="vertical"
    @click.stop
    @mousedown="header.getResizeHandler()?.($event)"
    @dblclick="header.column.resetSize()"
    @keydown.left.prevent="updateColumnSizeBy(header, -10)"
    @keydown.right.prevent="updateColumnSizeBy(header, 10)"
    @keydown.esc="header.column.resetSize()"
  >
    <div class="n-resize-handle-inner"></div>
  </div>
</template>

<style scoped>
.n-resize-handle {
  position: absolute;
  z-index: 3;
  inset-inline-end: 0;
  inset-block: 0;
  inline-size: var(--n-space-s);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-resize-handle:focus {
  outline: none;
}

.n-resize-handle-inner {
  width: 2px;
  background: var(--n-color-border);
  height: var(--n-space-m);
}

.n-resize-handle:is(:hover, .is-resizing) .n-resize-handle-inner {
  background: var(--n-color-border-hover);
}

.n-resize-handle:focus-visible .n-resize-handle-inner {
  background-color: var(--n-color-accent);
}
</style>
