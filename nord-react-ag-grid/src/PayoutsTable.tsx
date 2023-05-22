import {
  Badge,
  Dropdown,
  Button,
  Icon,
  DropdownGroup,
  DropdownItem,
} from "@nordhealth/react";
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
  <Badge style={{ textTransform: "capitalize" }} variant={statusMap[value]}>
    {value}
  </Badge>
);

const ActionDropdown = () => (
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
