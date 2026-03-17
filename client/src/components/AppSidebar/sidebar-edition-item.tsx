import { EditionsItem } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function SidebarEditionItem({
  edition,
  className,
}: {
  edition: EditionsItem;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="truncate text-sm font-medium">{edition.name}</span>
      {edition.active && <Badge variant="success">Active</Badge>}
    </div>
  );
}
