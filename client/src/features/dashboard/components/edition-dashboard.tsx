import { useEdition } from "@/features/edition/EditionContext";
import { CurrentBalanceCard } from "./current-balance-card";

export function EditionDashboard() {
  const { edition, setEdition } = useEdition();

  return (
    <div className="grid grid-flow-col grid-rows-3 gap-4 py-4">
      <div className="col-span-2">
        <CurrentBalanceCard />
      </div>
      <div className="col-span-3 row-span-2">02</div>
      <div className="col-span-5 row-span-2">03</div>
    </div>
  );
}
