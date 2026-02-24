import { Column } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

interface SortableHeaderProps<T> {
  column: Column<T, unknown>;
  title: string;
  className?: string;
}

export function SortableHeader<T>({
  column,
  title,
  className,
}: SortableHeaderProps<T>) {
  return (
    <div className={cx(className, "flex items-center")}>
      {title}
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={className}
      >
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
