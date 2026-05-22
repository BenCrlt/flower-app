import {
  BudgetCategoriesItem,
  GetOrderOriginQuery,
  ValidateOrderPaymentMethodInput,
} from "@/generated/graphql";
import { createContext } from "react";

export interface CatalogProduct {
  id: number;
  name: string;
  unitPrice: number;
  isFreePrice: boolean;
  category: BudgetCategoriesItem;
}

export interface CartLine {
  cartLineId: string;
  productId: number;
  name: string;
  category: BudgetCategoriesItem;
  quantity: number;
  unitPrice: number;
  isFreePrice: boolean;
}

export interface CashRegisterContextValue {
  handleSelectOrigin: (originId: number | null) => void;
  openSelectOriginDialog: boolean;
  orderOrigin: GetOrderOriginQuery["orderOrigin"];
  catalogProducts: CatalogProduct[];
  catalogProductsFiltered: CatalogProduct[];
  cartLines: CartLine[];
  cartLinesFiltered: CartLine[];
  getFixedProductQuantity: (productId: number) => number;
  onAddFixedProduct: (productId: number) => void;
  onRemoveFixedProduct: (productId: number) => void;
  onAddFreePriceProduct: (productId: number, unitPrice: number) => void;
  onRemoveCartLine: (cartLineId: string) => void;
  onSelectCategory: (category: BudgetCategoriesItem | null) => void;
  allCategoriesInCatalog: BudgetCategoriesItem[];
  selectedCategory: BudgetCategoriesItem | null;
  onValidateOrder: (paymentMethod: ValidateOrderPaymentMethodInput) => void;
  onStartCardPayment: (amount: number) => boolean;
  onCancelOrder: () => void;
}

export const CashRegisterContext =
  createContext<CashRegisterContextValue | null>(null);
