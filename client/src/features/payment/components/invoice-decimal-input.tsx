import { Input } from "@/components/ui/input";
import { ComponentProps, ReactElement, useState } from "react";

const PARTIAL_DECIMAL_PATTERN = /^\d*[,.]?\d*$/;

function formatDecimalValue(value: number): string {
  if (!Number.isFinite(value)) {
    return "";
  }
  return String(value);
}

function parseDecimalValue(raw: string): number | null {
  const normalized = raw.replace(",", ".").trim();
  if (!normalized) {
    return null;
  }
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function isIncompleteDecimal(raw: string): boolean {
  return raw.endsWith(".") || raw.endsWith(",");
}

interface Props extends Omit<
  ComponentProps<typeof Input>,
  "type" | "value" | "onChange" | "inputMode"
> {
  value: number;
  onChange: (value: number) => void;
  inputMode?: "decimal";
}

export function InvoiceDecimalInput({
  value,
  onChange,
  inputMode,
  onFocus,
  onBlur,
  ...props
}: Props): ReactElement {
  const [text, setText] = useState(() => formatDecimalValue(value));
  const [prevValue, setPrevValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Resynchronise le texte quand la valeur change de l'extérieur, sauf
  // pendant la saisie (ajustement pendant le rendu plutôt qu'un effet)
  if (value !== prevValue) {
    setPrevValue(value);
    if (!isFocused) {
      setText(formatDecimalValue(value));
    }
  }

  const commitValue = (raw: string) => {
    const parsed = parseDecimalValue(raw);
    if (parsed !== null) {
      onChange(parsed);
      setText(formatDecimalValue(parsed));
      return;
    }
    onChange(0);
    setText("");
  };

  return (
    <Input
      type="text"
      inputMode={inputMode}
      value={text}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw !== "" && !PARTIAL_DECIMAL_PATTERN.test(raw)) {
          return;
        }
        const display = raw.replace(",", ".");
        setText(display);
        if (display === "" || isIncompleteDecimal(display)) {
          return;
        }
        const parsed = parseDecimalValue(display);
        if (parsed !== null) {
          onChange(parsed);
        }
      }}
      {...props}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        commitValue(text);
        onBlur?.(e);
      }}
    />
  );
}
