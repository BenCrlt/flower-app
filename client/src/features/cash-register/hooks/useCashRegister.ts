import { useState } from "react";

const CASH_REGISTER_ORIGIN_ID_KEY = "cash-register-origin-id";

interface UseCashRegisterReturn {
  selectedOriginId: number | null;
  handleSelectOrigin: (originId: number) => void;
  openSelectOriginDialog: boolean;
}

export const useCashRegister = (): UseCashRegisterReturn => {
  const [selectedOriginId, setSelectedOriginId] = useState<number | null>(
    () => {
      const originId = localStorage.getItem(CASH_REGISTER_ORIGIN_ID_KEY);
      if (!originId) {
        return null;
      }

      const parsedOriginId = Number(originId);
      return Number.isNaN(parsedOriginId) ? null : parsedOriginId;
    },
  );

  const openSelectOriginDialog = selectedOriginId === null;

  const handleSelectOrigin = (originId: number) => {
    setSelectedOriginId(originId);
    localStorage.setItem(CASH_REGISTER_ORIGIN_ID_KEY, originId.toString());
  };

  return {
    selectedOriginId,
    handleSelectOrigin,
    openSelectOriginDialog,
  };
};
