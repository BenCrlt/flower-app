import { ReactElement, ReactNode, useState } from "react";

interface EditableFieldProps {
  label: string;
  displayValue: ReactNode;
  placeholder?: string;
  children: (props: { onEditDone: () => void }) => ReactElement;
}

export function EditableField({
  label,
  displayValue,
  placeholder,
  children,
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {editing ? (
        children({ onEditDone: () => setEditing(false) })
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="min-h-9 w-full rounded-md border border-transparent px-3 py-2 text-left text-sm transition-colors hover:border-input hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {displayValue || (
            <span className="text-muted-foreground italic">
              {placeholder ?? "—"}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
