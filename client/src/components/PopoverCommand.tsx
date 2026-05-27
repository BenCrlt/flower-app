import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

type PrimitiveValue = string | number;
type DefaultItem = { label: string; value: PrimitiveValue };

interface CommandPickerListProps<T extends DefaultItem> {
  items: T[];
  selectedValue?: PrimitiveValue;
  setSelectedValue: (value: PrimitiveValue) => void;
  actions: ReactElement[];
  actionsTitle: string;
  commandInputPlaceholder: string;
  title: string;
  emptyMessage: string;
  onClose: () => void;
  getItemValue: (item: T) => PrimitiveValue;
  getItemLabel: (item: T) => string;
  getItemSearchValue?: (item: T) => string;
  renderItem?: (
    item: T,
    ctx: { isSelected: boolean; label: string },
  ) => ReactNode;
  listClassName?: string;
}

function wrapActionWithClose(
  action: ReactElement,
  onClose: () => void,
): ReactElement {
  if (!isValidElement<{ onSelect?: (value: string) => void }>(action)) {
    return action;
  }
  const existingOnSelect = action.props.onSelect;
  return cloneElement(action, {
    onSelect: (value: string) => {
      existingOnSelect?.(value);
      onClose();
    },
  });
}

function CommandPickerList<T extends DefaultItem>({
  items,
  selectedValue,
  setSelectedValue,
  actions,
  actionsTitle,
  commandInputPlaceholder,
  title,
  emptyMessage,
  onClose,
  getItemValue,
  getItemLabel,
  getItemSearchValue,
  renderItem,
  listClassName,
}: CommandPickerListProps<T>) {
  return (
    <Command className="flex h-full min-h-0 flex-col">
      <CommandInput
        placeholder={commandInputPlaceholder}
        className="h-11 shrink-0 border-b"
      />
      <CommandList
        className={cn(
          "max-h-none flex-1 overflow-y-auto overscroll-contain",
          listClassName,
        )}
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
                  onClose();
                }}
                className="min-h-11 justify-between py-3"
              >
                {itemContent}
              </CommandItem>
            );
          })}
        </CommandGroup>
        {actions.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading={actionsTitle} forceMount>
              {actions.map((action, index) => (
                <div key={index}>{wrapActionWithClose(action, onClose)}</div>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}

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
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const selectedItem = items.find(
    (item) => getItemValue(item) === selectedValue,
  );
  const triggerValue = renderTriggerValue
    ? renderTriggerValue(selectedItem)
    : selectedItem
      ? getItemLabel(selectedItem)
      : inputPlaceholder;

  const close = () => setOpen(false);

  const triggerClassName = cn(
    "h-11 w-full justify-between font-normal",
    selectedValue == null && "text-muted-foreground",
    className,
  );

  const triggerLabel = (
    <>
      <span className="truncate">{triggerValue}</span>
      <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
    </>
  );

  const pickerList = (
    <CommandPickerList
      items={items}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      actions={actions}
      actionsTitle={actionsTitle}
      commandInputPlaceholder={commandInputPlaceholder}
      title={title}
      emptyMessage={emptyMessage}
      onClose={close}
      getItemValue={getItemValue}
      getItemLabel={getItemLabel}
      getItemSearchValue={getItemSearchValue}
      renderItem={renderItem}
      listClassName={isMobile ? undefined : "max-h-[300px] scrollbar-hide"}
    />
  );

  if (isMobile) {
    return (
      <>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={triggerClassName}
          onClick={() => setOpen(true)}
        >
          {triggerLabel}
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            showCloseButton
            className="flex h-[min(85dvh,560px)] max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-t-xl p-0"
          >
            <SheetHeader className="shrink-0 border-b px-4 py-3 text-left">
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div className="flex min-h-0 flex-1 flex-col">{pickerList}</div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={triggerClassName}
        >
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[400px] p-0", contentClassName)}
        align="start"
      >
        {pickerList}
      </PopoverContent>
    </Popover>
  );
}
