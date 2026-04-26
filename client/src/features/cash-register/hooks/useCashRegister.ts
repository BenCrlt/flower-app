import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import {
  BudgetCategoriesItem,
  BudgetLinesItem,
  GetOrderOriginQuery,
  LineTypeEnum,
} from "@/generated/graphql";
import { useState } from "react";
import { useGetOrderOriginQuery } from "./useGetOrderOriginQuery";

const CASH_REGISTER_ORIGIN_ID_KEY = "cash-register-origin-id";

export interface CartProduct extends Pick<BudgetLinesItem, "id" | "name"> {
  quantity: number;
  category: Pick<BudgetCategoriesItem, "id" | "color" | "name">;
}

export interface UseCashRegisterReturn {
  handleSelectOrigin: (originId: number) => void;
  openSelectOriginDialog: boolean;
  orderOrigin: GetOrderOriginQuery["orderOrigin"];
  cartProducts: CartProduct[];
  onAddProductToCart: (productId: number) => void;
  onRemoveProductToCart: (productId: number) => void;
}

export const useCashRegister = (): UseCashRegisterReturn => {
  const { edition } = useEdition();
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
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const { data: orderOriginData } = useGetOrderOriginQuery({
    variables: { id: selectedOriginId ?? 0 },
    enabled: selectedOriginId !== null,
  });

  useGetBudgetLinesQuery({
    variables: {
      editionId: edition.id,
      budgetLineType: LineTypeEnum.Income,
    },
    onComplete: ({ budgetLines }) => {
      setCartProducts(
        budgetLines.map((product) => ({
          id: product.id,
          name: product.name,
          quantity: 0,
          category: product.category!,
        })),
      );
    },
  });

  const handleCart = (
    productId: number,
    direction: "increment" | "decrement",
    quantity = 1,
  ) => {
    const newCartProducts = cartProducts.map((product) => {
      if (product.id === productId) {
        const newQuantity =
          direction === "increment"
            ? product.quantity + quantity
            : Math.max(0, product.quantity - quantity);
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });
    setCartProducts(newCartProducts);
  };

  const openSelectOriginDialog = selectedOriginId === null;

  const handleSelectOrigin = (originId: number) => {
    setSelectedOriginId(originId);
    localStorage.setItem(CASH_REGISTER_ORIGIN_ID_KEY, originId.toString());
  };

  return {
    handleSelectOrigin,
    openSelectOriginDialog,
    orderOrigin: orderOriginData?.orderOrigin,
    cartProducts,
    onAddProductToCart: (productId: number) =>
      handleCart(productId, "increment"),
    onRemoveProductToCart: (productId: number) =>
      handleCart(productId, "decrement"),
  };
};
