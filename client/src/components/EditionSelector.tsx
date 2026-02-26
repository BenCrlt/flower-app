import { useEditionContext } from "@/features/edition/EditionContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TypographyH2 } from "./ui/typography";
export const EditionSelector = () => {
  const { edition, setEdition, editions } = useEditionContext();

  if (editions.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4 py-4">
      <Select
        value={edition?.id.toString()}
        onValueChange={(value) => {
          const found = editions.find((e) => e.id.toString() === value);
          if (found) setEdition(found);
        }}
      >
        <SelectTrigger className="w-[350px]" size="lg">
          <SelectValue>
            <TypographyH2>{edition?.name}</TypographyH2>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {editions.map((e) => (
              <SelectItem key={e.id} value={e.id.toString()}>
                {e.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
