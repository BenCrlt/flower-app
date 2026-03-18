import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { ReactElement } from "react";
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

interface Props {
  items: { label: string; value: number }[];
  selectedValue: number;
  setSelectedValue: (value: number) => void;
  actions: ReactElement[];
  inputPlaceholder: string;
  commandInputPlaceholder: string;
  title: string;
  emptyMessage: string;
  className?: string;
}

export function PopoverCommand({
  inputPlaceholder,
  title,
  commandInputPlaceholder,
  emptyMessage,
  items,
  selectedValue,
  setSelectedValue,
  actions,
  className,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between",
            !selectedValue && "text-muted-foreground",
            className,
          )}
        >
          {selectedValue
            ? items.find((item) => item.value === selectedValue)?.label
            : inputPlaceholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder={commandInputPlaceholder} className="h-9" />
          <CommandList
            className="max-h-[300px] overflow-y-auto overscroll-contain scrollbar-hide"
            onWheel={(e) => e.stopPropagation()}
          >
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup heading={title}>
              {items.map((item) => (
                <CommandItem
                  value={item.value.toString()}
                  key={item.value}
                  onSelect={() => {
                    setSelectedValue(item.value);
                  }}
                  className="justify-between"
                >
                  <span>{item.label}</span>
                  <Check
                    className="h-4 w-4"
                    opacity={selectedValue === item.value ? 1 : 0}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            {actions.length > 0 && (
              <CommandGroup heading="Actions" forceMount>
                {actions}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
