import { Badge } from "./ui/badge";

interface Props {
  name: string;
  color: string;
}

export function CategoryBadge({ name, color }: Props) {
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
