import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { Data, data } from "./data";
import { DataTable } from "./DataTable/DataTable";

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

function ActionDropdown() {
  return (
    <nord-dropdown
      size="s"
      position="block-end"
      align="end"
      style={{ display: "inline-block", marginBlock: -10 }}
    >
      <nord-button slot="toggle" aria-describedby="tooltip" size="s">
        <nord-icon
          name="interface-menu-small"
          color="var(--n-color-icon)"
          label="Open menu"
          size="s"
        ></nord-icon>
      </nord-button>
      <nord-dropdown-group>
        <nord-dropdown-item href="#">View payment details</nord-dropdown-item>
        <nord-dropdown-item>Open in new tab</nord-dropdown-item>
        <nord-dropdown-item>Copy link</nord-dropdown-item>
      </nord-dropdown-group>
      <nord-dropdown-group>
        <nord-dropdown-item data-action="refund">
          Refund payment
        </nord-dropdown-item>
        <nord-dropdown-item data-action="delete">
          <span>Delete</span>
          <nord-icon slot="end" name="interface-delete" size="s"></nord-icon>
        </nord-dropdown-item>
      </nord-dropdown-group>
    </nord-dropdown>
  );
}

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
    cell: (props) => (
      <nord-badge variant={statusMap[props.getValue()]}>
        {props.getValue()}
      </nord-badge>
    ),
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
    cell: () => (
      <div className="n-table-actions">
        <ActionDropdown />
      </div>
    ),
    meta: {
      style: {
        textAlign: "end",
      },
    },
  }),
];

export function PayoutsTable() {
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return <DataTable table={table} />;
}
