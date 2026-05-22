import { useEdition } from "@/features/edition/EditionContext";
import {
  BudgetCategoriesItem,
  ValidateOrderPaymentMethodInput,
} from "@/generated/graphql";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CartLine,
  CashRegisterContext,
  CatalogProduct,
} from "../CashRegisterContext";
import { useGetOrderOriginQuery } from "../hooks/useGetOrderOriginQuery";
import { useSumUp } from "../hooks/useSumUp";
import { useValidateOrderMutation } from "../hooks/useValidateOrderMutation";

const CASH_REGISTER_ORIGIN_ID_KEY = "cash-register-origin-id";
const CASH_REGISTER_CART_KEY_PREFIX = "cash-register-cart";

type StoredCartLine = {
  cartLineId: string;
  productId: number;
  quantity: number;
  unitPrice?: number;
};

type LegacyStoredCartItem = {
  productId: number;
  quantity: number;
};

function createCartLineId(): string {
  return crypto.randomUUID();
}

type OrderOriginBudgetLine = {
  id: number;
  name: string;
  estimatedUnitPrice: string;
  isFreePrice: boolean;
  category?: BudgetCategoriesItem | null;
};

function buildCatalogFromBudgetLines(
  budgetLines: OrderOriginBudgetLine[],
): CatalogProduct[] {
  return budgetLines.map((product) => ({
    id: product.id,
    name: product.name,
    unitPrice: Number(product.estimatedUnitPrice) || 0,
    isFreePrice: product.isFreePrice,
    category: product.category!,
  }));
}

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
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>(
    [],
  );
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  const catalogById = useMemo(
    () => new Map(catalogProducts.map((product) => [product.id, product])),
    [catalogProducts],
  );

  const allCategoriesInCatalog = useMemo(
    () =>
      catalogProducts.reduce<BudgetCategoriesItem[]>((acc, product) => {
        if (acc.some((value) => value.id === product.category.id)) {
          return acc;
        }
        return [...acc, product.category];
      }, []),
    [catalogProducts],
  );

  const filterByCategory = <T extends { category: BudgetCategoriesItem }>(
    items: T[],
  ) =>
    items.filter(
      (item) =>
        !selectedCategory || selectedCategory.id === item.category.id,
    );

  const catalogProductsFiltered = filterByCategory(catalogProducts);
  const cartLinesFiltered = filterByCategory(cartLines);

  const getStoredCartLines = useCallback((): StoredCartLine[] => {
    const storedCartRaw = localStorage.getItem(cartStorageKey);
    if (!storedCartRaw) {
      return [];
    }

    try {
      const parsed = JSON.parse(storedCartRaw) as
        | StoredCartLine[]
        | LegacyStoredCartItem[];

      if (!Array.isArray(parsed)) {
        return [];
      }

      if (
        parsed.length > 0 &&
        parsed[0] &&
        "cartLineId" in parsed[0]
      ) {
        return (parsed as StoredCartLine[]).filter(
          (item) =>
            typeof item.cartLineId === "string" &&
            Number.isInteger(item.productId) &&
            Number.isFinite(item.quantity) &&
            item.quantity > 0,
        );
      }

      return (parsed as LegacyStoredCartItem[])
        .filter(
          (item) =>
            Number.isInteger(item.productId) &&
            Number.isFinite(item.quantity) &&
            item.quantity > 0,
        )
        .map((item) => ({
          cartLineId: createCartLineId(),
          productId: item.productId,
          quantity: item.quantity,
        }));
    } catch {
      localStorage.removeItem(cartStorageKey);
      return [];
    }
  }, [cartStorageKey]);

  const restoreCartLines = useCallback(
    (
      catalog: CatalogProduct[],
      storedLines: StoredCartLine[],
    ): CartLine[] => {
      const catalogMap = new Map(catalog.map((p) => [p.id, p]));

      return storedLines.flatMap((stored) => {
        const product = catalogMap.get(stored.productId);
        if (!product) {
          return [];
        }

        const unitPrice =
          stored.unitPrice !== undefined
            ? stored.unitPrice
            : product.unitPrice;

        return [
          {
            cartLineId: stored.cartLineId,
            productId: product.id,
            name: product.name,
            category: product.category,
            quantity: product.isFreePrice ? 1 : stored.quantity,
            unitPrice,
            isFreePrice: product.isFreePrice,
          },
        ];
      });
    },
    [],
  );

  const persistCartLines = useCallback(
    (lines: CartLine[]) => {
      const serializable: StoredCartLine[] = lines.map((line) => ({
        cartLineId: line.cartLineId,
        productId: line.productId,
        quantity: line.quantity,
        ...(line.isFreePrice ? { unitPrice: line.unitPrice } : {}),
      }));
      localStorage.setItem(cartStorageKey, JSON.stringify(serializable));
    },
    [cartStorageKey],
  );

  const updateCartLines = useCallback(
    (updater: (lines: CartLine[]) => CartLine[]) => {
      setCartLines((prev) => {
        const next = updater(prev);
        persistCartLines(next);
        return next;
      });
    },
    [persistCartLines],
  );

  const { data: orderOriginData } = useGetOrderOriginQuery({
    variables: { id: selectedOriginId ?? 0 },
    enabled: selectedOriginId !== null,
    onComplete: ({ orderOrigin }) => {
      const catalog = buildCatalogFromBudgetLines(
        orderOrigin?.budgetLines ?? [],
      );
      const stored = getStoredCartLines();
      setCatalogProducts(catalog);
      setCartLines(restoreCartLines(catalog, stored));
      if (!stored.length) {
        localStorage.setItem(cartStorageKey, JSON.stringify([]));
      }
    },
  });

  function clearCart() {
    setCartLines([]);
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

  const getFixedProductQuantity = useCallback(
    (productId: number) =>
      cartLines
        .filter((line) => line.productId === productId && !line.isFreePrice)
        .reduce((sum, line) => sum + line.quantity, 0),
    [cartLines],
  );

  const onAddFixedProduct = useCallback(
    (productId: number) => {
      const product = catalogById.get(productId);
      if (!product || product.isFreePrice) {
        return;
      }

      updateCartLines((lines) => {
        const existingIndex = lines.findIndex(
          (line) => line.productId === productId && !line.isFreePrice,
        );

        if (existingIndex >= 0) {
          return lines.map((line, index) =>
            index === existingIndex
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          );
        }

        return [
          ...lines,
          {
            cartLineId: createCartLineId(),
            productId: product.id,
            name: product.name,
            category: product.category,
            quantity: 1,
            unitPrice: product.unitPrice,
            isFreePrice: false,
          },
        ];
      });
    },
    [catalogById, updateCartLines],
  );

  const onRemoveFixedProduct = useCallback(
    (productId: number) => {
      updateCartLines((lines) => {
        const existingIndex = lines.findIndex(
          (line) => line.productId === productId && !line.isFreePrice,
        );
        if (existingIndex < 0) {
          return lines;
        }

        const existing = lines[existingIndex];
        if (existing.quantity <= 1) {
          return lines.filter((_, index) => index !== existingIndex);
        }

        return lines.map((line, index) =>
          index === existingIndex
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        );
      });
    },
    [updateCartLines],
  );

  const onAddFreePriceProduct = useCallback(
    (productId: number, unitPrice: number) => {
      const product = catalogById.get(productId);
      if (!product?.isFreePrice) {
        return;
      }

      updateCartLines((lines) => [
        ...lines,
        {
          cartLineId: createCartLineId(),
          productId: product.id,
          name: product.name,
          category: product.category,
          quantity: 1,
          unitPrice,
          isFreePrice: true,
        },
      ]);
    },
    [catalogById, updateCartLines],
  );

  const onRemoveCartLine = useCallback(
    (cartLineId: string) => {
      updateCartLines((lines) =>
        lines.filter((line) => line.cartLineId !== cartLineId),
      );
    },
    [updateCartLines],
  );

  const openSelectOriginDialog = selectedOriginId === null;

  const handleSelectOrigin = (originId: number | null) => {
    setSelectedOriginId(originId);
    if (originId) {
      localStorage.setItem(CASH_REGISTER_ORIGIN_ID_KEY, originId.toString());
    } else {
      localStorage.removeItem(CASH_REGISTER_ORIGIN_ID_KEY);
    }
  };

  const onValidateOrder = (paymentMethod: ValidateOrderPaymentMethodInput) => {
    if (!cartLines.length) {
      return;
    }

    const sales = cartLines.map((line) => ({
      budgetLineId: line.productId,
      quantity: line.quantity,
      ...(line.isFreePrice ? { unitPrice: line.unitPrice } : {}),
    }));

    void validateOrder({
      editionId: edition.id,
      originId: selectedOriginId ?? 0,
      paymentMethod,
      sales,
    });
  };

  const { startCardPayment } = useSumUp({
    onValidateCardPayment: () =>
      onValidateOrder(ValidateOrderPaymentMethodInput.Card),
  });

  return (
    <CashRegisterContext.Provider
      value={{
        handleSelectOrigin,
        openSelectOriginDialog,
        orderOrigin: orderOriginData?.orderOrigin,
        catalogProducts,
        catalogProductsFiltered,
        cartLines,
        cartLinesFiltered,
        getFixedProductQuantity,
        onAddFixedProduct,
        onRemoveFixedProduct,
        onAddFreePriceProduct,
        onRemoveCartLine,
        allCategoriesInCatalog,
        onSelectCategory: setSelectedCategory,
        selectedCategory,
        onValidateOrder,
        onStartCardPayment: startCardPayment,
        onCancelOrder: clearCart,
      }}
    >
      {children}
    </CashRegisterContext.Provider>
  );
};
