import { useContext } from "react";
import { CashRegisterContext } from "../CashRegisterContext";

export const useCashRegister = () => {
  const context = useContext(CashRegisterContext);
  if (!context) {
    throw new Error(
      "useCashRegister must be used within a CashRegisterContextProvider",
    );
  }
  return context;
};
