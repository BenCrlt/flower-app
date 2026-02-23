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
  editionSelected: EditionsItem | null;
  setEditionSelected: (edition: EditionsItem | null) => void;
  editions: EditionsItem[];
}

export const EditionContext = createContext<EditionContextValue | null>(null);

function EditionProviderInner({ children }: { children: ReactNode }) {
  const [editionSelected, setEditionSelected] = useState<EditionsItem | null>(
    null,
  );

  const { data } = useGetEditionsQuery({
    onComplete: (response) => {
      if (response.editions.length > 0) {
        setEditionSelected(response.editions[0]);
      }
    },
  });

  const editions = useMemo(() => data?.editions || [], [data]);

  return (
    <EditionContext.Provider
      value={{ editionSelected, setEditionSelected, editions }}
    >
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
  return context;
}
