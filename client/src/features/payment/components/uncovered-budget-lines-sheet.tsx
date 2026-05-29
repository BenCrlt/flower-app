import { CategoryBadge } from "@/components/CategoryBadge";
import { RowPrice } from "@/components/Table/RowPrice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead className="text-right">Prévu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell className="font-medium">{line.name}</TableCell>
                    <TableCell>
                      {line.category ? (
                        <CategoryBadge
                          name={line.category.name}
                          color={line.category.color}
                        />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <RowPrice amount={line.forecastAmount} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
