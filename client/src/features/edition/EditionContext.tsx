import { EditionsItem } from "@/generated/graphql";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useGetEditionsQuery } from "./hooks/useGetEditions";

const EDITION_KEY = "edition";

export interface EditionContextValue {
  edition: EditionsItem | null;
  setEdition: (edition: EditionsItem) => void;
  editions: EditionsItem[];
}

export const EditionContext = createContext<EditionContextValue>({
  edition: null,
  setEdition: () => {},
  editions: [],
});

export function EditionProvider({ children }: { children: ReactNode }) {
  const [edition, setEdition] = useState<EditionsItem | null>(() => {
    const storedEdition = localStorage.getItem(EDITION_KEY);
    return storedEdition ? JSON.parse(storedEdition) : null;
  });

  const { data } = useGetEditionsQuery({
    onComplete: (data) => {
      if (
        (edition && !data.editions.some((e) => e.id === edition.id)) ||
        !edition
      ) {
        handleSetEdition(data.editions.length > 0 ? data.editions[0] : null);
      }
    },
  });
  const editions = useMemo(() => data?.editions ?? [], [data]);

  const handleSetEdition = (edition: EditionsItem | null) => {
    setEdition(edition);
    if (edition) {
      localStorage.setItem(EDITION_KEY, JSON.stringify(edition));
    } else {
      localStorage.removeItem(EDITION_KEY);
    }
  };

  return (
    <EditionContext.Provider value={{ edition, setEdition, editions }}>
      {children}
    </EditionContext.Provider>
  );
}

export function useEdition(): EditionContextValue {
  const context = useContext(EditionContext);
  if (!context) {
    throw new Error("useEdition must be used within an EditionProvider");
  }
  return context as EditionContextValue;
}
