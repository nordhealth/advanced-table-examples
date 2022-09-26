<script setup lang="ts">
import { h } from "vue";
import {
  createColumnHelper,
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/vue-table";

import { data, Data } from "./data.js";
import DataTable from "./DataTable/DataTable.vue";
import PayoutActions from "./PayoutActions.vue";

const statusMap = {
  success: "success",
  alert: "danger",
  warning: "warning",
} as const;

const dateFormatter = new Intl.DateTimeFormat("fi-FI", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

const columnHelper = createColumnHelper<Data>();
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: "end",
      },
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    size: 90,
    minSize: 90,
    cell: (props) =>
      h("nord-badge", { type: statusMap[props.getValue()] }, props.getValue()),
    meta: {
      style: {
        textTransform: "capitalize",
      },
    },
  }),

  columnHelper.accessor("amount", {
    header: "Amount",
    size: 100,
    minSize: 100,
    cell: (props) => currencyFormatter.format(props.getValue()),
  }),

  columnHelper.accessor("description", {
    header: "Description",
    minSize: 400,
    size: 600,
    meta: {
      truncate: true,
    },
  }),

  columnHelper.accessor("method", {
    header: "Method",
    size: 90,
    minSize: 90,
    meta: {
      style: {
        textTransform: "capitalize",
      },
    },
  }),

  columnHelper.accessor("date", {
    header: "Date",
    size: 90,
    minSize: 90,
    cell: (props) => dateFormatter.format(props.getValue()),
    meta: {
      style: {
        textAlign: "end",
      },
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    minSize: 70,
    maxSize: 70,
    size: 70,
    enableResizing: false,
    enableSorting: false,
    cell: () => h(PayoutActions),
    meta: {
      style: {
        textAlign: "end",
      },
    },
  }),
];

const table = useVueTable({
  data,
  columns,
  columnResizeMode: "onChange",
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
</script>

<template>
  <DataTable :table="table" />
</template>
