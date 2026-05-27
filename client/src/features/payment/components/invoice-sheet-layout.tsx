import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ReactElement, ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
  footer: ReactNode;
  onSubmit: () => void;
}

export function InvoiceSheetLayout({
  title,
  description = "Cliquez sur un champ pour le modifier.",
  children,
  footer,
  onSubmit,
}: Props): ReactElement {
  const isMobile = useIsMobile();

  return (
    <SheetContent
      side={isMobile ? "bottom" : "right"}
      className={cn(
        "flex flex-col gap-0 p-0",
        isMobile
          ? "h-[92dvh] max-h-[92dvh] rounded-t-2xl"
          : "md:max-w-xl",
      )}
    >
      <SheetHeader className="shrink-0 border-b px-4 py-4 pr-12">
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <div className="flex flex-col gap-6">{children}</div>
        </div>
        <SheetFooter className="shrink-0 gap-2 border-t bg-background px-4 py-3">
          {footer}
        </SheetFooter>
      </form>
    </SheetContent>
  );
}
