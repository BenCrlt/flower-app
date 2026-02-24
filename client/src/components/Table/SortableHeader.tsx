import { Column } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { ReactNode, useMemo } from "react";
import { Button } from "../ui/button";

interface SortableHeaderProps<T> {
  column: Column<T, unknown>;
  title: ReactNode;
  className?: string;
}

export function SortableHeader<T>({
  column,
  title,
  className,
}: SortableHeaderProps<T>) {
  const isSorted = column.getIsSorted();
  const icon = useMemo(() => {
    if (!isSorted) {
      return <ChevronsUpDown />;
    } else if (isSorted === "asc") {
      return <ArrowDown />;
    } else {
      return <ArrowUp />;
    }
  }, [isSorted]);

  return (
    <div className={cx(className, "flex items-center")}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className={className}
      >
        {title}
        {icon}
      </Button>
    </div>
  );
}
