import { EditionBaseInfo } from "@/features/edition/EditionContext";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function SidebarEditionItem({
  edition,
  className,
}: {
  edition: EditionBaseInfo;
  className?: string;
}) {
  console.log(edition);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="truncate text-sm font-medium">{edition.name}</span>
      {edition.active && <Badge variant="default">Active</Badge>}
    </div>
  );
}
