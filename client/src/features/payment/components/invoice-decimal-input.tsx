import { Input } from "@/components/ui/input";
import {
  ComponentProps,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

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
  ...props
}: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(() => formatDecimalValue(value));

  useEffect(() => {
    if (inputRef.current !== document.activeElement) {
      setText(formatDecimalValue(value));
    }
  }, [value]);

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
      ref={inputRef}
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
      onBlur={() => commitValue(text)}
      {...props}
    />
  );
}
