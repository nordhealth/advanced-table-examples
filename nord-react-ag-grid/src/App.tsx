import { PayoutsTable } from "./PayoutsTable";

export default function App() {
  return (
    <nord-card padding="none">
      <h2 slot="header">Payouts</h2>
      <PayoutsTable />
    </nord-card>
  );
}
