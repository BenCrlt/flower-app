import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { ReactElement, useEffect, useState } from "react";

const MIN_AMOUNT = 0.01;
const MAX_AMOUNT = 500;
const PRESETS = [1, 5, 10, 20, 30, 50];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  onConfirm: (amount: number) => void;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function parseAmount(raw: string): number | null {
  const normalized = raw.replace(",", ".").trim();
  if (!normalized) {
    return null;
  }
  const value = Number(normalized);
  if (!Number.isFinite(value)) {
    return null;
  }
  return roundMoney(value);
}

function isValidAmount(amount: number | null): amount is number {
  return amount !== null && amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
}

export function FreePriceAmountSheet({
  open,
  onOpenChange,
  productName,
  onConfirm,
}: Props): ReactElement {
  const [amountInput, setAmountInput] = useState("");

  useEffect(() => {
    if (open) {
      setAmountInput("");
    }
  }, [open]);

  const parsedAmount = parseAmount(amountInput);
  const canConfirm = isValidAmount(parsedAmount);

  const handleConfirm = () => {
    if (!canConfirm) {
      return;
    }
    onConfirm(parsedAmount);
    onOpenChange(false);
  };

  const handlePreset = (amount: number) => {
    onConfirm(amount);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[90vh] rounded-t-xl px-4 pb-6"
      >
        <SheetHeader className="text-left">
          <SheetTitle>{productName}</SheetTitle>
          <SheetDescription>
            Choisissez un montant entre {formatPriceToEuros(MIN_AMOUNT)} et{" "}
            {formatPriceToEuros(MAX_AMOUNT)}.
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-3 py-4">
          {PRESETS.map((amount) => (
            <Button
              key={amount}
              type="button"
              variant="outline"
              size="lg"
              className="min-h-12 text-base"
              onClick={() => handlePreset(amount)}
            >
              {formatPriceToEuros(amount)}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="free-price-amount"
            className="text-sm font-medium text-foreground"
          >
            Autre montant
          </label>
          <Input
            id="free-price-amount"
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            className="min-h-12 text-lg"
          />
        </div>

        <SheetFooter className="mt-6 gap-2 sm:flex-col">
          <Button
            type="button"
            size="lg"
            className="min-h-12 w-full text-base"
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            Ajouter au panier
            {canConfirm ? ` (${formatPriceToEuros(parsedAmount)})` : ""}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
