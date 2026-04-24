import { GetOrderOriginQuery } from "@/generated/graphql";
import { useState } from "react";
import { useGetOrderOriginQuery } from "./useGetOrderOriginQuery";

const CASH_REGISTER_ORIGIN_ID_KEY = "cash-register-origin-id";

interface UseCashRegisterReturn {
  handleSelectOrigin: (originId: number) => void;
  openSelectOriginDialog: boolean;
  orderOrigin: GetOrderOriginQuery["orderOrigin"];
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

  const { data: orderOriginData } = useGetOrderOriginQuery({
    variables: { id: selectedOriginId ?? 0 },
    enabled: selectedOriginId !== null,
  });

  const openSelectOriginDialog = selectedOriginId === null;

  const handleSelectOrigin = (originId: number) => {
    setSelectedOriginId(originId);
    localStorage.setItem(CASH_REGISTER_ORIGIN_ID_KEY, originId.toString());
  };

  return {
    handleSelectOrigin,
    openSelectOriginDialog,
    orderOrigin: orderOriginData?.orderOrigin,
  };
};
