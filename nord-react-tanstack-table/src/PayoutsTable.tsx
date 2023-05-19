import {
  Badge,
  Dropdown,
  Button,
  Icon,
  DropdownGroup,
  DropdownItem,
} from "@nordhealth/react";
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
    <Dropdown
      size="s"
      position="block-end"
      align="end"
      style={{ display: "inline-block", marginBlock: -10 }}
    >
      <Button slot="toggle" aria-describedby="tooltip" size="s">
        <Icon
          name="interface-menu-small"
          color="var(--n-color-icon)"
          label="Open menu"
          size="s"
        ></Icon>
      </Button>
      <DropdownGroup>
        <DropdownItem href="#">View payment details</DropdownItem>
        <DropdownItem>Open in new tab</DropdownItem>
        <DropdownItem>Copy link</DropdownItem>
      </DropdownGroup>
      <DropdownGroup>
        <DropdownItem data-action="refund">Refund payment</DropdownItem>
        <DropdownItem data-action="delete">
          <span>Delete</span>
          <Icon slot="end" name="interface-delete" size="s"></Icon>
        </DropdownItem>
      </DropdownGroup>
    </Dropdown>
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
      <Badge variant={statusMap[props.getValue()]}>{props.getValue()}</Badge>
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
