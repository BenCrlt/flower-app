import { CashRegister } from "@/features/cash-register";
import { CashRegisterContextProvider } from "@/features/cash-register/component/cash-register-context-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cash-register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CashRegisterContextProvider>
      <CashRegister />
    </CashRegisterContextProvider>
  );
}
