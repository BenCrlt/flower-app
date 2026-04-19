import { Badge } from "./ui/badge";

interface Props {
  name: string;
  color: string | undefined;
  className?: string;
}

export function CategoryBadge({
  name,
  color = "#3b82f6",
  className,
}: Props) {
  return (
    <Badge
      title={name}
      style={{
        backgroundColor: color,
        borderColor: color,
        color: "#fff",
      }}
      className={className}
    >
      {name}
    </Badge>
  );
}
