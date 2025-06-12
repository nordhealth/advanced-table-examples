<script setup lang="ts">
import "ag-grid-community/styles/ag-grid.css";
import "@nordhealth/ag-theme-nord";

import {
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";
import CustomHeader from "./CustomHeader.vue";

const { columns, defaultColumn, data, components } = defineProps<{
  columns: GridOptions["columnDefs"];
  defaultColumn: GridOptions["defaultColDef"];
  components?: GridOptions["components"];
  data: any;
}>();

ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({
  theme: "legacy",
});

const onGridReady = (params: GridReadyEvent) => {
  params.api.sizeColumnsToFit();
  params.api.setGridOption("domLayout", "autoHeight");
};
</script>

<template>
  <div class="ag-theme-nord" :style="{ width: '100%' }">
    <AgGridVue
      :columnDefs="columns"
      :defaultColDef="defaultColumn"
      :rowData="data"
      :components="{ agColumnHeader: CustomHeader, ...components }"
      @grid-ready="onGridReady"
      :suppressRowTransform="true"
    />
  </div>
</template>
