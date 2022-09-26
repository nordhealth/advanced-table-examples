<script setup lang="ts">
import { Data, data } from "./data.js";
import DataTable from "./DataTable/DataTable.vue";

import PayoutActions from "./PayoutActions.vue";
import PayoutStatus from "./PayoutStatus.vue";

const dateFormatter = new Intl.DateTimeFormat("fi-FI", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    type: "rightAligned",
  },
  {
    field: "amount",
    width: 110,
    valueFormatter: (params: { value: Data["amount"] }) =>
      currencyFormatter.format(params.value),
  },
  {
    field: "status",
    cellRenderer: "statusCellRenderer",
    width: 125,
    minWidth: 125,
  },
  {
    field: "description",
    width: 800,
    minWidth: 400,
  },
  {
    field: "date",
    width: 120,
    minWidth: 120,
    valueFormatter: (params: { value: Data["date"] }) =>
      dateFormatter.format(params.value),
  },
  {
    field: "actions",
    width: 80,
    minWidth: 80,
    cellRenderer: "actionsCellRenderer",
    type: "rightAligned",
    sortable: false,
  },
];

const defaultColumn = {
  resizable: true,
  sortable: true,
  minWidth: 100,
};

const components = {
  actionsCellRenderer: PayoutActions,
  statusCellRenderer: PayoutStatus,
};
</script>

<template>
  <DataTable
    :columns="columns"
    :data="data"
    :defaultColumn="defaultColumn"
    :components="components"
  />
</template>
