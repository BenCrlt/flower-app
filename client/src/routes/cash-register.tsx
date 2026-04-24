import { CashRegister } from "@/features/cash-register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cash-register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CashRegister />;
}
