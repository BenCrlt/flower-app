import { CategoryBadge } from "@/components/CategoryBadge";
import { RowPrice } from "@/components/Table/RowPrice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { UncoveredBudgetLine } from "../hooks/useInvoicesPanel";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: UncoveredBudgetLine[];
}

export function UncoveredBudgetLinesSheet({
  open,
  onOpenChange,
  lines,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex h-svh max-h-svh w-full flex-col overflow-hidden sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Lignes budget non déclarées</SheetTitle>
          <SheetDescription>
            Lignes de dépense sans aucun paiement rattaché à une facture.
          </SheetDescription>
        </SheetHeader>
        <div className="scrollbar-gutter-stable mt-4 min-h-0 flex-1 overflow-y-auto px-1 pr-3">
          {lines.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Toutes les lignes de dépense ont au moins une déclaration en
              facture.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{line.name}</p>
                    {line.category ? (
                      <div className="mt-1">
                        <CategoryBadge
                          name={line.category.name}
                          color={line.category.color}
                        />
                      </div>
                    ) : (
                      <p className="mt-1 text-xs text-muted-foreground">—</p>
                    )}
                  </div>
                  <RowPrice amount={line.forecastAmount} />
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
