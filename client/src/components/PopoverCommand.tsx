import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PrimitiveValue = string | number;
type DefaultItem = { label: string; value: PrimitiveValue };

interface Props<T extends DefaultItem = DefaultItem> {
  items: T[];
  selectedValue?: PrimitiveValue;
  setSelectedValue: (value: PrimitiveValue) => void;
  actions?: ReactElement[];
  inputPlaceholder: string;
  commandInputPlaceholder: string;
  title: string;
  emptyMessage: string;
  actionsTitle?: string;
  className?: string;
  contentClassName?: string;
  getItemValue?: (item: T) => PrimitiveValue;
  getItemLabel?: (item: T) => string;
  getItemSearchValue?: (item: T) => string;
  renderItem?: (
    item: T,
    ctx: { isSelected: boolean; label: string },
  ) => ReactNode;
  renderTriggerValue?: (selectedItem?: T) => ReactNode;
}

export function PopoverCommand<T extends DefaultItem = DefaultItem>({
  inputPlaceholder,
  title,
  commandInputPlaceholder,
  emptyMessage,
  items,
  selectedValue,
  setSelectedValue,
  actions = [],
  actionsTitle = "Actions",
  className,
  contentClassName,
  getItemValue = (item) => item.value,
  getItemLabel = (item) => item.label,
  getItemSearchValue,
  renderItem,
  renderTriggerValue,
}: Props<T>) {
  const selectedItem = items.find(
    (item) => getItemValue(item) === selectedValue,
  );
  const triggerValue = renderTriggerValue
    ? renderTriggerValue(selectedItem)
    : selectedItem
      ? getItemLabel(selectedItem)
      : inputPlaceholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between",
            selectedValue == null && "text-muted-foreground",
            className,
          )}
        >
          {triggerValue}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[400px] p-0", contentClassName)}
        align="start"
      >
        <Command>
          <CommandInput placeholder={commandInputPlaceholder} className="h-9" />
          <CommandList
            className="max-h-[300px] overflow-y-auto overscroll-contain scrollbar-hide"
            onWheel={(e) => e.stopPropagation()}
          >
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup heading={title}>
              {items.map((item) => {
                const itemValue = getItemValue(item);
                const label = getItemLabel(item);
                const isSelected = selectedValue === itemValue;
                const itemContent = renderItem ? (
                  renderItem(item, { isSelected, label })
                ) : (
                  <>
                    <span>{label}</span>
                    <Check className="h-4 w-4" opacity={isSelected ? 1 : 0} />
                  </>
                );

                return (
                  <CommandItem
                    value={getItemSearchValue?.(item) ?? label}
                    key={itemValue}
                    onSelect={() => {
                      setSelectedValue(itemValue);
                    }}
                    className="justify-between"
                  >
                    {itemContent}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            {actions.length > 0 && (
              <CommandGroup heading={actionsTitle} forceMount>
                {actions}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
