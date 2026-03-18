import { Badge } from "./ui/badge";

interface Props {
  name: string;
  color: string | undefined;
}

export function CategoryBadge({ name, color = "#3b82f6" }: Props) {
  return (
    <Badge
      style={{
        backgroundColor: color,
        borderColor: color,
        color: "#fff",
      }}
    >
      {name}
    </Badge>
  );
}
