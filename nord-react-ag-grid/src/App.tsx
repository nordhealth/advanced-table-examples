import { Card } from "@nordhealth/react";
import { PayoutsTable } from "./PayoutsTable";

export default function App() {
  return (
    <Card padding="none">
      <h2 slot="header">Payouts</h2>
      <PayoutsTable />
    </Card>
  );
}
