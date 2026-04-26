import {
  BudgetCategoriesItem,
  BudgetLinesItem,
  GetOrderOriginQuery,
} from "@/generated/graphql";
import { createContext } from "react";

export interface CartProduct extends Pick<BudgetLinesItem, "id" | "name"> {
  quantity: number;
  category: BudgetCategoriesItem;
}

export interface CashRegisterContextValue {
  handleSelectOrigin: (originId: number) => void;
  openSelectOriginDialog: boolean;
  orderOrigin: GetOrderOriginQuery["orderOrigin"];
  cartProducts: CartProduct[];
  onAddProductToCart: (productId: number) => void;
  onRemoveProductToCart: (productId: number) => void;
  onSelectCategory: (category: BudgetCategoriesItem) => void;
  allCategoriesInProducts: BudgetCategoriesItem[];
  selectedCategories: BudgetCategoriesItem[];
}

export const CashRegisterContext =
  createContext<CashRegisterContextValue | null>(null);
