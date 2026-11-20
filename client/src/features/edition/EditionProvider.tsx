import { Spinner } from "@/components/ui/spinner";
import { useMemo, useState, type ReactNode } from "react";
import { EditionContext, type EditionBaseInfo } from "./EditionContext";
import { useGetEditionsQuery } from "./hooks/useGetEditions";
import { NoEditions } from "./no-editions";

const EDITION_KEY = "edition";

export function EditionProvider({ children }: { children: ReactNode }) {
  const [edition, setEdition] = useState<EditionBaseInfo | null>(() => {
    const storedEdition = localStorage.getItem(EDITION_KEY);
    return storedEdition ? JSON.parse(storedEdition) : null;
  });

  const { data, isLoading } = useGetEditionsQuery({
    onComplete: (data) => {
      if (data.editions.length === 0) {
        clearEdition();
        return;
      }

      const editionId = edition?.id;
      if (editionId == null || !data.editions.some((e) => e.id === editionId)) {
        handleSetEdition(data.editions[0]);
      }
    },
  });
  const editions = useMemo(() => data?.editions ?? [], [data]);

  const clearEdition = () => {
    setEdition(null);
    localStorage.removeItem(EDITION_KEY);
  };

  const handleSetEdition = (edition: EditionBaseInfo) => {
    setEdition(edition);
    if (edition) {
      localStorage.setItem(EDITION_KEY, JSON.stringify(edition));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!edition) {
    return <NoEditions />;
  }

  return (
    <EditionContext.Provider value={{ edition, handleSetEdition, editions }}>
      {children}
    </EditionContext.Provider>
  );
}
