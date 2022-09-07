import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "@nordhealth/ag-theme-nord";
import "./DataTable.css";

import { CustomHeader } from "./CustomHeader";

const components = {
  agColumnHeader: CustomHeader,
};

const onGridReady = (params: GridReadyEvent) => {
  params.api.sizeColumnsToFit();
  params.api.setDomLayout("autoHeight");
};

export function DataTable<TData>({
  columns,
  data,
  defaultColumn,
}: {
  columns: ColDef<TData>[];
  data: TData[];
  defaultColumn: ColDef<TData>;
}) {
  return (
    <div className="ag-theme-nord" style={{ width: "100%" }}>
      <AgGridReact<TData>
        columnDefs={columns}
        rowData={data}
        defaultColDef={defaultColumn}
        onGridReady={onGridReady}
        components={components}
        suppressRowTransform={true}
      />
    </div>
  );
}
