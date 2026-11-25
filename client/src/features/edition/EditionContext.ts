import { createContext, useContext } from "react";

export type EditionBaseInfo = {
  id: number;
  name: string;
  active: boolean;
  startDate: string;
  endDate: string;
  openingBalance: number;
};

export interface EditionContextValue {
  edition: EditionBaseInfo;
  handleSetEdition: (edition: EditionBaseInfo) => void;
  editions: EditionBaseInfo[];
}

export const EditionContext = createContext<EditionContextValue | null>(null);

export function useEdition(): EditionContextValue {
  const context = useContext(EditionContext);
  if (!context) {
    throw new Error("useEdition must be used within an EditionProvider");
  }

  if (!context.edition) {
    throw new Error("useEdition need at least one edition");
  }

  return context as EditionContextValue;
}
