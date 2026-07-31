import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ListFilter } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

export interface CheckboxFilterOption<T extends string | number = number> {
  id: T;
  label?: string;
}

interface Props<T extends string | number> {
  label: string;
  options: CheckboxFilterOption<T>[];
  selectedIds: T[];
  onToggle: (id: T, checked: boolean) => void;
  renderOption?: (option: CheckboxFilterOption<T>) => ReactNode;
  contentClassName?: string;
  triggerClassName?: string;
}

export function CheckboxFilterSheet<T extends string | number>({
  label,
  options,
  selectedIds,
  onToggle,
  renderOption,
  contentClassName,
  triggerClassName,
}: Props<T>) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const count = selectedIds.length;

  const trigger = (
    <Button
      type="button"
      variant={count ? "default" : "outline"}
      className={cn(
        "h-11 w-full border-dashed sm:h-9 sm:w-auto sm:max-w-fit",
        triggerClassName,
      )}
    >
      <ListFilter />
      {label} {count ? `(${count})` : ""}
    </Button>
  );

  const renderLabel = (option: CheckboxFilterOption<T>) =>
    renderOption ? (
      renderOption(option)
    ) : (
      <span className="truncate">{option.label ?? String(option.id)}</span>
    );

  if (isMobile) {
    return (
      <>
        <div onClick={() => setOpen(true)}>{trigger}</div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            showCloseButton
            className="flex max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-t-xl p-0"
          >
            <SheetHeader className="shrink-0 border-b px-4 py-3 text-left">
              <SheetTitle>{label}</SheetTitle>
            </SheetHeader>
            <div
              className={cn(
                "flex-1 overflow-y-auto overscroll-contain px-4 py-2",
                contentClassName,
              )}
            >
              {options.map((option) => {
                const checked = selectedIds.includes(option.id);
                const itemId = `filter-${label}-${option.id}`;

                return (
                  <Label
                    key={String(option.id)}
                    htmlFor={itemId}
                    className="flex min-h-11 cursor-pointer items-center gap-3 border-b py-3 last:border-b-0"
                  >
                    <Checkbox
                      id={itemId}
                      checked={checked}
                      onCheckedChange={(value) =>
                        onToggle(option.id, value === true)
                      }
                    />
                    {renderLabel(option)}
                  </Label>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={cn("w-44", contentClassName)}
      >
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={String(option.id)}
              className="capitalize"
              checked={selectedIds.includes(option.id)}
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={(value) => onToggle(option.id, value)}
            >
              {renderLabel(option)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
