import {
  BudgetCategoriesItem,
  BudgetLinesItem,
  GetOrderOriginQuery,
} from "@/generated/graphql";
import { createContext } from "react";

export interface CartProduct extends Pick<BudgetLinesItem, "id" | "name"> {
  quantity: number;
  unitPrice: number;
  category: BudgetCategoriesItem;
}

export interface CashRegisterContextValue {
  handleSelectOrigin: (originId: number | null) => void;
  openSelectOriginDialog: boolean;
  orderOrigin: GetOrderOriginQuery["orderOrigin"];
  allCartProducts: CartProduct[];
  cartProducts: CartProduct[];
  onAddProductToCart: (productId: number) => void;
  onRemoveProductToCart: (productId: number) => void;
  onSelectCategory: (category: BudgetCategoriesItem) => void;
  allCategoriesInProducts: BudgetCategoriesItem[];
  selectedCategories: BudgetCategoriesItem[];
}

export const CashRegisterContext =
  createContext<CashRegisterContextValue | null>(null);
