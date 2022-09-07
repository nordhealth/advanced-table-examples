<script setup lang="ts">
import { Data, data } from "./data.js";
import DataTable from "./DataTable/DataTable.vue";

const statusMap = {
  success: "success",
  alert: "danger",
  warning: "warning",
} as const;

type Status = keyof typeof statusMap;

const statusRenderer = ({ value }: { value: Status }) =>
  `<nord-badge style="text-transform: capitalize" type="${statusMap[value]}">
    ${value}
  </nord-badge>`;

const actionRenderer = () => `
  <nord-dropdown size="s" position="block-end" align="end" style="display: inline-block; margin-block: -10px">
  <nord-button slot="toggle" aria-describedby="tooltip" size="s">
    <nord-icon
      name="interface-menu-small"
      color="var(--n-color-icon)"
      label="Open menu"
      size="s"
      style="margin-top: 1px"
    ></nord-icon>
  </nord-button>
  <nord-dropdown-group>
    <nord-dropdown-item href="#">View payment details</nord-dropdown-item>
    <nord-dropdown-item>Open in new tab</nord-dropdown-item>
    <nord-dropdown-item>Copy link</nord-dropdown-item>
  </nord-dropdown-group>
  <nord-dropdown-group>
    <nord-dropdown-item data-action="refund">Refund payment</nord-dropdown-item>
    <nord-dropdown-item data-action="delete">
      <span>Delete</span>
      <nord-icon slot="end" name="interface-delete" size="s"></nord-icon>
    </nord-dropdown-item>
  </nord-dropdown-group>
  </nord-dropdown>
`;

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
    cellRenderer: statusRenderer,
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
    cellRenderer: actionRenderer,
    type: "rightAligned",
    sortable: false,
  },
];

const defaultColumn = {
  resizable: true,
  sortable: true,
  minWidth: 100,
};
</script>

<template>
  <DataTable :columns="columns" :data="data" :defaultColumn="defaultColumn" />
</template>
