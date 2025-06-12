import { ColDef } from "ag-grid-community";

import { Data, data } from "./data.js";
import { DataTable } from "./DataTable/DataTable";

const dateFormatter = new Intl.DateTimeFormat("fi-FI", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

const statusMap = {
  success: "success",
  alert: "danger",
  warning: "warning",
} as const;

const StatusRenderer = ({ value }: { value: Data["status"] }) => (
  <nord-badge
    style={{ textTransform: "capitalize" }}
    variant={statusMap[value]}
  >
    {value}
  </nord-badge>
);

const ActionDropdown = () => (
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

const columns: ColDef<Data>[] = [
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
    cellRenderer: StatusRenderer,
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
    cellRenderer: ActionDropdown,
    type: "rightAligned",
    sortable: false,
  },
];

const defaultColumn = {
  resizable: true,
  sortable: true,
  minWidth: 100,
  editable: false,
};

export function PayoutsTable() {
  return (
    <DataTable data={data} columns={columns} defaultColumn={defaultColumn} />
  );
}
