<script setup lang="ts">
import "ag-grid-community/styles/ag-grid.css";
import "@nordhealth/ag-theme-nord";

import { GridOptions, GridReadyEvent } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";
import CustomHeader from "./CustomHeader.vue";

const { columns, defaultColumn, data } = defineProps<{
  columns: GridOptions["columnDefs"];
  defaultColumn: GridOptions["defaultColDef"];
  data: any;
}>();

const onGridReady = (params: GridReadyEvent) => {
  params.api.sizeColumnsToFit();
  params.api.setDomLayout("autoHeight");
};

const components = { agColumnHeader: CustomHeader };
</script>

<template>
  <div class="ag-theme-nord" :style="{ width: '100%' }">
    <AgGridVue
      :columnDefs="columns"
      :defaultColDef="defaultColumn"
      :rowData="data"
      :components="components"
      @grid-ready="onGridReady"
      :suppressRowTransform="true"
    />
  </div>
</template>
