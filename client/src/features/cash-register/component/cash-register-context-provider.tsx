import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import {
  BudgetCategoriesItem,
  LineTypeEnum,
  ValidateOrderPaymentMethodInput,
} from "@/generated/graphql";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { CartProduct, CashRegisterContext } from "../CashRegisterContext";
import { useGetOrderOriginQuery } from "../hooks/useGetOrderOriginQuery";
import { useValidateOrderMutation } from "../hooks/useValidateOrderMutation";

const CASH_REGISTER_ORIGIN_ID_KEY = "cash-register-origin-id";
const CASH_REGISTER_CART_KEY_PREFIX = "cash-register-cart";

type StoredCartItem = {
  productId: number;
  quantity: number;
};

export const CashRegisterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { edition } = useEdition();
  const cartStorageKey = `${CASH_REGISTER_CART_KEY_PREFIX}-${edition.id}`;
  const [selectedCategory, setSelectedCategory] =
    useState<BudgetCategoriesItem | null>(null);

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
      !selectedCategory || selectedCategory.id === product.category.id,
  );

  const { data: orderOriginData } = useGetOrderOriginQuery({
    variables: { id: selectedOriginId ?? 0 },
    enabled: selectedOriginId !== null,
  });

  const getStoredCartItems = (): StoredCartItem[] => {
    const storedCartRaw = localStorage.getItem(cartStorageKey);
    if (!storedCartRaw) {
      return [];
    }

    try {
      const storedCart = JSON.parse(storedCartRaw) as StoredCartItem[];
      return storedCart.filter(
        (item) =>
          Number.isInteger(item.productId) &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0,
      );
    } catch {
      localStorage.removeItem(cartStorageKey);
      return [];
    }
  };

  const updateStoredCart = (products: CartProduct[]) => {
    const serializableCart = products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      }));

    localStorage.setItem(cartStorageKey, JSON.stringify(serializableCart));
  };

  const { data: budgetLinesData } = useGetBudgetLinesQuery({
    variables: {
      editionId: edition.id,
      budgetLineType: LineTypeEnum.Income,
    },
    onComplete: ({ budgetLines }) => {
      const storedCartItems = getStoredCartItems();
      const storedQuantitiesByProductId = new Map<number, number>();

      if (!storedCartItems.length) {
        localStorage.setItem(cartStorageKey, JSON.stringify([]));
      }

      storedCartItems.forEach(({ productId, quantity }) => {
        storedQuantitiesByProductId.set(productId, quantity);
      });

      setCartProducts(
        budgetLines.map((product) => ({
          id: product.id,
          name: product.name,
          quantity: storedQuantitiesByProductId.get(product.id) ?? 0,
          unitPrice: Number(product.estimatedUnitPrice) || 0,
          category: product.category!,
        })),
      );
    },
  });

  function clearCart() {
    setCartProducts(
      (budgetLinesData?.budgetLines ?? []).map((product) => ({
        id: product.id,
        name: product.name,
        quantity: 0,
        unitPrice: Number(product.estimatedUnitPrice) || 0,
        category: product.category!,
      })),
    );
    setSelectedCategory(null);
    localStorage.setItem(cartStorageKey, JSON.stringify([]));
  }

  const { mutate: validateOrder } = useValidateOrderMutation({
    onError: (error) => {
      toast.error("Erreur lors de la validation de la commande", {
        description: error.message,
      });
    },
    onSuccess: () => {
      clearCart();
      toast.success("Commande validée avec succès");
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
    updateStoredCart(newCartProducts);
    setCartProducts(newCartProducts);
  };

  const openSelectOriginDialog = selectedOriginId === null;

  const handleSelectOrigin = (originId: number | null) => {
    setSelectedOriginId(originId);

    if (originId) {
      localStorage.setItem(CASH_REGISTER_ORIGIN_ID_KEY, originId.toString());
    } else {
      localStorage.removeItem(CASH_REGISTER_ORIGIN_ID_KEY);
    }
  };

  const onSelectCategory = (category: BudgetCategoriesItem | null) => {
    setSelectedCategory(category);
  };

  const onValidateOrder = (paymentMethod: ValidateOrderPaymentMethodInput) => {
    const sales = cartProducts.map((product) => ({
      budgetLineId: product.id,
      quantity: product.quantity,
    }));

    void validateOrder({
      editionId: edition.id,
      originId: selectedOriginId ?? 0,
      paymentMethod,
      sales,
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
        selectedCategory,
        onValidateOrder,
        onCancelOrder: clearCart,
      }}
    >
      {children}
    </CashRegisterContext.Provider>
  );
};
