import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { BudgetCategoriesItem, LineTypeEnum } from "@/generated/graphql";
import { ReactNode, useState } from "react";
import { CartProduct, CashRegisterContext } from "../CashRegisterContext";
import { useGetOrderOriginQuery } from "../hooks/useGetOrderOriginQuery";

const CASH_REGISTER_ORIGIN_ID_KEY = "cash-register-origin-id";

export const CashRegisterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { edition } = useEdition();
  const [selectedCategories, setSelectedCategories] = useState<
    BudgetCategoriesItem[]
  >([]);

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

  const allCategoriesInProducts = cartProducts.reduce<BudgetCategoriesItem[]>(
    (acc, product) => {
      if (acc.some((value) => value.id === product.category.id)) {
        return acc;
      }
      return [...acc, product.category];
    },
    [],
  );

  const cartProductsToDisplay = cartProducts.filter(
    (product) =>
      !selectedCategories.length ||
      selectedCategories.some(
        (category) => category.id === product.category.id,
      ),
  );

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
          unitPrice: Number(product.estimatedUnitPrice) || 0,
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

  const onSelectCategory = (category: BudgetCategoriesItem) => {
    setSelectedCategories((previous) => {
      if (previous.includes(category)) {
        return previous.filter((value) => value.id !== category.id);
      }
      return [...previous, category];
    });
  };

  return (
    <CashRegisterContext.Provider
      value={{
        handleSelectOrigin,
        openSelectOriginDialog,
        orderOrigin: orderOriginData?.orderOrigin,
        allCartProducts: cartProducts,
        cartProducts: cartProductsToDisplay,
        onAddProductToCart: (productId: number) =>
          handleCart(productId, "increment"),
        onRemoveProductToCart: (productId: number) =>
          handleCart(productId, "decrement"),
        allCategoriesInProducts,
        onSelectCategory,
        selectedCategories,
      }}
    >
      {children}
    </CashRegisterContext.Provider>
  );
};
