import { EditionsItem } from "@/generated/graphql";
import {
  createContext,
  Suspense,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useGetEditionsQuery } from "./hooks/useGetEditions";

export interface EditionContextValue {
  edition: EditionsItem;
  setEdition: (edition: EditionsItem) => void;
  editions: EditionsItem[];
}

export interface EditionContextValueEmpty {
  edition: null;
  setEdition: (edition: EditionsItem) => void;
  editions: EditionsItem[];
}

export const EditionContext = createContext<
  EditionContextValue | EditionContextValueEmpty | null
>(null);

function EditionProviderInner({ children }: { children: ReactNode }) {
  const { data } = useGetEditionsQuery({
    onComplete: (data) => {
      if (data.editions.length > 0) {
        setEdition(data.editions[0]);
      }
    },
  });
  const editions = useMemo(() => data?.editions ?? [], [data]);

  const [edition, setEdition] = useState<EditionsItem | null>(
    editions[0] ?? null,
  );

  return (
    <EditionContext.Provider value={{ edition, setEdition, editions }}>
      {children}
    </EditionContext.Provider>
  );
}

export function EditionProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <EditionProviderInner>{children}</EditionProviderInner>
    </Suspense>
  );
}

export function useEdition(): EditionContextValue {
  const context = useContext(EditionContext);
  if (!context) {
    throw new Error("useEdition must be used within an EditionProvider");
  }
  if (!context.edition) {
    throw new Error("useEdition: no edition selected");
  }
  return context as EditionContextValue;
}

export function useEditionContext():
  | EditionContextValue
  | EditionContextValueEmpty {
  const context = useContext(EditionContext);
  if (!context) {
    throw new Error("useEditionContext must be used within an EditionProvider");
  }
  return context;
}
